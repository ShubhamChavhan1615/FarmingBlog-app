import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaArrowLeft } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface BlogData {
  title: string;
  date: string;
  plantationDate?: string;
  pesticide?: string;
  photo?: FileList;
  description: string;
}

const PostsBlogs: React.FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<BlogData>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onSubmit = async (data: BlogData) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          if (key === 'photo') {
            formData.append(key, data[key] ? (data[key] as FileList)[0] : ''); // handle case when photo is null
          } else {
            formData.append(key, data[key] as string);
          }
        }
      }
      const authToken = localStorage.getItem("authToken") || "";
      const encodedToken = encodeURIComponent(authToken); // Encode the token
      const response = await fetch('http://localhost:4000/blogs', {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${encodedToken}` // Include the encoded token in the Authorization header
        },
        body: formData
      });
      if(response.ok) {
          toast.success("Blog Created successfully", { autoClose: 1000 })
          setTimeout(() => {
            navigate("/")
          }, 1000);
          reset(); // Reset form after successful submission
      } else {
        console.log(response.statusText);
      }
    } catch (error) {
      console.error('Error posting blog:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <ToastContainer/>
      <Link to={`/`}><FaArrowLeft className='relative top-8 right-[150px] text-2xl cursor-pointer' title='back' /></Link>
      <h1 className="text-2xl font-bold mb-4">Post a Blog</h1>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input type="text" id="title" {...register('title', { required: true, minLength: 3 })} className={`mt-1 p-2 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-md w-full focus:outline-none focus:ring focus:border-blue-500`} />
          {errors.title && errors.title.type === 'required' && <p className="text-red-500">Title is required.</p>}
          {errors.title && errors.title.type === 'minLength' && <p className="text-red-500">Title must be at least 3 characters long.</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="plantationDate" className="block text-sm font-medium text-gray-700">Plantation Date</label>
          <input type="date" id="plantationDate" {...register('plantationDate')} className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-500" />
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
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500" disabled={isSubmitting}>
          {isSubmitting ? "Posting..." : "Post Blog"}
        </button>
      </form>
    </div>
  );
}

export default PostsBlogs;
