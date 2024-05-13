import React from 'react';
import { useLocation } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';

interface CropDetails {
  name: string;
  description: string;
  image: string;
  bestPesticide: string;
  plantDuration: string;
}

const cropDetails: { [key: string]: CropDetails } = {
  onion: {
    name: 'Onion',
    description: `Onion, scientifically known as Allium cepa, is a biennial or perennial bulb crop belonging to the Allium genus, along with garlic, shallots, and chives. It is cultivated globally for its distinctive flavor and culinary versatility. Onions are an essential ingredient in various cuisines worldwide and are valued for their pungent taste and aroma.
    
    Cultivation of onions dates back thousands of years, with evidence of their consumption found in ancient Egyptian tombs. They are believed to have originated in central Asia and have been cultivated for over 5,000 years. Today, onions are grown in diverse climates and regions, making them one of the most widely cultivated vegetables.
    
    Onions are typically grown from seeds, sets (small bulbs), or transplants. The cultivation process involves preparing the soil, planting the bulbs, and providing adequate irrigation and nutrients throughout the growing season. Onions require well-drained soil and plenty of sunlight to thrive.
    
    Depending on the variety and growing conditions, onions can take anywhere from 80 to 150 days to reach maturity. They are usually harvested when the tops of the plants have dried and fallen over.
    
    There are numerous varieties of onions, including yellow onions, red onions, white onions, and sweet onions. Each variety has its unique flavor profile and culinary uses. For example, yellow onions are commonly used in savory dishes such as soups, stews, and stir-fries, while sweet onions are prized for their mild flavor and are often eaten raw in salads or on sandwiches.
    
    Onions are not only prized for their culinary uses but also for their nutritional value. They are low in calories and fat but rich in vitamins, minerals, and antioxidants. Onions contain vitamins C and B6, as well as folate, potassium, and manganese. They also contain phytochemicals such as quercetin and sulfur compounds, which have various health benefits.`,
    image: 'https://media.istockphoto.com/id/1135657897/photo/onions-at-vegetable-market.webp?b=1&s=170667a&w=0&k=20&c=249rBIX5pXQhT-tOXKO030uCZl13lwzXTV5-fn5cHCA=',
    bestPesticide: 'Neem oil spray',
    plantDuration: '90-120 days',
  },
  sugarcane: {
    name: 'Sugarcane',
    description: `Sugarcane (Saccharum officinarum) is a tall perennial grass in the genus Saccharum, tribe Andropogoneae, native to the warm temperate to tropical regions of South Asia. It is cultivated for its juice from which sugar is processed. Sugarcane cultivation spread throughout Southeast Asia, Pacific, and Indian Ocean regions, and then to the Americas.
    
    Sugarcane is grown primarily for sugar production. The process begins with the planting of sugarcane stalks or cuttings, known as "setts" or "seed cane." Sugarcane requires a tropical or subtropical climate with plenty of sunlight, water, and fertile soil. It grows in stalks that can reach up to 6 meters in height.
    
    Sugarcane takes about 10 to 12 months to reach maturity, depending on the climate and variety. Once mature, the stalks are harvested by hand or machine and transported to sugar mills for processing. The juice is extracted from the stalks and processed to produce raw sugar, molasses, and other by-products.
    
    In addition to sugar production, sugarcane is also used to produce ethanol, biofuels, and various other products. The fiber leftover after juice extraction, known as bagasse, is used as a biofuel to generate electricity or as a feedstock for paper and pulp production.
    
    Sugarcane cultivation plays a significant role in the economies of many countries, especially in tropical regions. It provides employment opportunities for millions of people and contributes to food security and rural development. However, sugarcane cultivation also faces challenges such as environmental degradation, water scarcity, and labor issues.`,
    image: 'https://media.istockphoto.com/id/186613938/photo/view-of-a-sugar-cane-plantation-under-a-light-blue-sky.webp?b=1&s=170667a&w=0&k=20&c=RuP_7LXOk_hFT-89TYRiU1PEwMtfwwZIx3Rmw8EDqfU=',
    bestPesticide: 'Glyphosate',
    plantDuration: '10-12 months',
  },
  potato: {
    name: 'Potato',
    description: `The potato (Solanum tuberosum) is a starchy tuberous crop from the perennial nightshade family, Solanaceae. Potatoes were first domesticated in the Andes region of South America over 10,000 years ago. They have since become one of the world's most important food crops and are grown in diverse climates and regions.
    
    Potatoes are grown from seed potatoes, which are small tubers or pieces of larger tubers. They are planted in rows or hills in well-drained soil and require ample sunlight, water, and nutrients to thrive. Potatoes are typically ready for harvest 90 to 120 days after planting, depending on the variety and growing conditions.
    
    There are thousands of potato varieties, ranging in size, shape, color, and texture. Common varieties include Russet, Yukon Gold, Red Bliss, and Fingerling potatoes. Each variety has its unique flavor and culinary uses, making potatoes a versatile ingredient in cooking.
    
    Potatoes are rich in carbohydrates and vitamins, especially vitamin C and potassium. They are also a good source of fiber, antioxidants, and other nutrients. Potatoes can be prepared in various ways, including boiling, baking, frying, and mashing. They are used in a wide range of dishes, from mashed potatoes and french fries to potato salads and gratins.
    
    In addition to their culinary uses, potatoes are also used to produce starch, flour, and alcohol. They are an important staple food for billions of people worldwide and play a vital role in global food security and nutrition.`,
    image: 'https://media.istockphoto.com/id/146875171/photo/fresh-potatoes-harvested-from-the-ground.webp?b=1&s=170667a&w=0&k=20&c=MqMDYOMTBTh-8pjfFqfDx8DcWpa1sKFDebMLlRNY6L0=',
    bestPesticide: 'Bacillus thuringiensis',
    plantDuration: '90-120 days',
  },
  tomato: {
    name: 'Tomato',
    description: `The tomato (Solanum lycopersicum) is a fruit from the nightshade family native to western South America and Central America. It is one of the most widely cultivated crops in the world, grown for its edible fruits in various shapes, sizes, and colors.
    
    Tomatoes are grown as annuals in temperate climates and as perennials in tropical climates. They are typically grown from seeds, which are sown indoors and transplanted to the garden after the last frost date. Tomatoes require full sun, well-drained soil, and regular watering to thrive.
    
    Depending on the variety, tomatoes can take 60 to 85 days to reach maturity. They are usually harvested when the fruits are fully ripe and have developed their characteristic color and flavor. Tomatoes are rich in vitamins A and C, potassium, and antioxidants such as lycopene.
    
    There are thousands of tomato varieties, ranging from small cherry tomatoes to large beefsteak tomatoes. Common types include Roma, San Marzano, Beefmaster, and Brandywine tomatoes. Each variety has its unique flavor, texture, and culinary uses.
    
    Tomatoes are used in a wide range of dishes, including salads, soups, sauces, and sandwiches. They can be eaten raw or cooked and are often preserved by canning, drying, or freezing. Tomatoes are also used to produce ketchup, tomato paste, salsa, and other processed products.`,
    image: 'https://media.istockphoto.com/id/171579643/photo/tomato-greenhouse.webp?b=1&s=170667a&w=0&k=20&c=HrIBW9c4LsHHuscsY7ZFTD0CskRm0IRZMGD3eB-xCKw=',
    bestPesticide: 'Diatomaceous earth',
    plantDuration: '60-85 days',
  },
};


const Crops: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const pathSegments = currentPath.split('/');
  const lastSegment = pathSegments[pathSegments.length - 1];

  const renderCropDetails = () => {
    if (cropDetails[lastSegment]) {
      const { name, description, image, bestPesticide, plantDuration } = cropDetails[lastSegment];
      return (
        <div className="bg-white shadow-md h-auto w-full rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">{name}</h2>
          <div className="mb-4">
            <img src={image} alt={name} className="w-[300px] h-[200px] rounded-lg" />
          </div>
          <p>{description}</p>
          <p><strong>Best Pesticide:</strong> {bestPesticide}</p>
          <p><strong>Plant Duration:</strong> {plantDuration}</p>
        </div>
      );
    } else {
      return <div>No information available for this crop.</div>;
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Crop Details</h1>
        <div className='h-auto w-full'>{renderCropDetails()}</div>
      </div>
      <Footer />
    </>
  );
}

export default Crops;
