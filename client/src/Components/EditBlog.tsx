import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface BlogData {
  id: string;
  title: string;
  plantationDate: string;
  pesticide: string;
  photo: {
    name: string;
  };
  description: string;
}

function EditBlog() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState<BlogData>({
    id: '',
    title: '',
    plantationDate: '',
    pesticide: '',
    photo: {
      name: ''
    },
    description: '',
  });

  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const authToken = localStorage.getItem("authToken") || "";
        const encodedToken = encodeURIComponent(authToken);
        const response = await fetch(`http://localhost:4000/blog/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${encodedToken}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch blog data');
        }

        const responseData = await response.json();
        setBlogData(responseData.blogData);
        // Set form values
        setValue('title', responseData.blogData.title);
        const formattedDate = new Date(responseData.blogData.plantationDate).toISOString().split('T')[0];
        setValue('plantationDate', formattedDate);
        setValue('pesticide', responseData.blogData.pesticide);
        setValue('description', responseData.blogData.description);
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };

    fetchBlog();
  }, [id, setValue]);
  

  const onSubmit = async (data: any) => {
    try {
      const authToken = localStorage.getItem("authToken") || "";
      const encodedToken = encodeURIComponent(authToken);

      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('plantationDate', data.plantationDate);
      formData.append('pesticide', data.pesticide);
      formData.append('description', data.description);
      // Append file if selected
      if (data.photo[0]) {
        formData.append('photo', data.photo[0]);
      }

      const response = await fetch(`http://localhost:4000/blog/edit/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${encodedToken}`
        },
        body: formData
      });

      const responseData = await response.json();

      if (response.ok) {
        const { updatedBlog } = responseData;
        const { user } = updatedBlog;
        const userId = user[0];
        toast.success("Blog edited", { autoClose: 1000 });
        setTimeout(() => {
          navigate(`/profile/${userId}/posts`);
        }, 1000);
      } else {
        toast.error(responseData.error, { autoClose: 1000 });
        console.error('Error updating blog:', responseData.error);
      }
    } catch (error) {
      console.error('Error updating blog:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <ToastContainer />
      <Link to={"/"}><FaArrowLeft className='relative top-8 right-[150px] text-2xl cursor-pointer' title='back' /></Link>
      <h1 className="text-2xl font-bold mb-4">Edit a Blog</h1>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input type="text" id="title" {...register('title', { required: true, minLength: 3 })} className={`mt-1 p-2 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-md w-full focus:outline-none focus:ring focus:border-blue-500`} />
          {errors.title && errors.title.type === 'required' && <p className="text-red-500">Title is required.</p>}
          {errors.title && errors.title.type === 'minLength' && <p className="text-red-500">Title must be at least 3 characters long.</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="plantationDate" className="block text-sm font-medium text-gray-700">Plantation Date</label>
          <input type="date" id="plantationDate" {...register('plantationDate', { required: true })} className={`mt-1 p-2 border ${errors.plantationDate ? 'border-red-500' : 'border-gray-300'} rounded-md w-full focus:outline-none focus:ring focus:border-blue-500`} />
          {errors.plantationDate && <p className="text-red-500">Plantation Date is required.</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="pesticide" className="block text-sm font-medium text-gray-700">Pesticide</label>
          <input type="text" id="pesticide" {...register('pesticide')} className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="photo" className="block text-sm font-medium text-gray-700">Photo</label>
          <input type="file" id="photo" accept="image/*" {...register('photo')} className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea id="description" {...register('description', { required: true, minLength: 10 })} rows={4} className={`mt-1 p-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md w-full focus:outline-none focus:ring focus:border-blue-500`}></textarea>
          {errors.description && errors.description.type === 'required' && <p className="text-red-500">Description is required.</p>}
          {errors.description && errors.description.type === 'minLength' && <p className="text-red-500">Description must be at least 10 characters long.</p>}
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500">Edit Blog</button>
      </form>
    </div>
  );
}

export default EditBlog;
