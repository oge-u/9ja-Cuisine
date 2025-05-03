import { defineStore } from 'pinia';
import axios from 'axios';

export const useDishesStore = defineStore('dishes', {
  state: () => ({
    dishes: [
        {
          id: 1,
          name: 'Jollof Rice',
          description: 'A spicy, tomato-based rice dish loved across Nigeria.',
          image: 'https://placehold.co/400x200?text=Jollof+Rice',
        },
        {
          id: 2,
          name: 'Egusi Soup',
          description: 'A rich melon seed stew served with pounded yam.',
          image: 'https://placehold.co/400x200?text=Egusi+Soup',
        },
        
        {
          id: 3,
          name: 'Ofada Rice and Sauce',
          description: 'Locally grown rice served with spicy pepper sauce.',
          image: 'https://placehold.co/400x200?text=Ofada+Rice',
        },
        {
          id: 4,
          name: 'Okra Soup',
          description: 'A slimy and nutritious soup made with okra and assorted meats.',
          image: 'https://placehold.co/400x200?text=Okra+Soup',
        },
        
      ],
      
    profilePhoto: 'https://placehold.co/50x50',
    isLoading: true,
    error: null,
    imagesLoaded: 0,
  }),
  actions: {
    async fetchDishes() {
      this.isLoading = true;
      this.error = null;
      this.imagesLoaded = 0;
    
      const apiKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
    
      const staticDishes = [
        { id: 1, name: 'Jollof Rice', description: 'Spicy tomato rice dish.' },
        { id: 2, name: 'Egusi Soup', description: 'Melon seed soup with pounded yam.' },
        { id: 3, name: 'Ofada Rice and Sauce', description: 'Locally grown rice served with spicy pepper sauce.' },
        { id: 4, name: 'Okra Soup', description: 'A slimy and nutritious soup made with okra and assorted meats.' },
        
      ];
    
      try {
        const fetchImage = async (dish) => {
          const res = await axios.get(
            `https://api.unsplash.com/search/photos?query=${encodeURIComponent(dish.name)}&per_page=1&orientation=landscape&client_id=${apiKey}`
          );
          const img = res.data?.results?.[0]?.urls?.small || `https://placehold.co/400x200?text=${encodeURIComponent(dish.name)}`;
          return { ...dish, image: img };
        };
    
        this.dishes = await Promise.all(staticDishes.map(fetchImage));
      } catch (error) {
        console.error('Error fetching dish images:', error.message);
        this.error = 'Failed to load dishes.';
        this.dishes = staticDishes.map(d => ({
          ...d,
          image: `https://placehold.co/400x200?text=${encodeURIComponent(d.name)}`,
        }));
      } finally {
        this.isLoading = false;
      }
    },
    

    async fetchProfilePhoto() {
      try {
        const response = await axios.get('https://randomuser.me/api/');
        const user = response.data?.results?.[0];
        this.profilePhoto = user?.picture?.thumbnail || 'https://placehold.co/50x50';
      } catch (error) {
        console.error('Error fetching profile photo:', error.message);
        this.profilePhoto = 'https://placehold.co/50x50';
      }
    },

    incrementImagesLoaded(name) {
      this.imagesLoaded++;
      console.log(`Image loaded: ${name}, Total loaded: ${this.imagesLoaded}`);
    },

    handleImageError(name) {
      console.error(`Image failed to load: ${name}`);
      this.imagesLoaded++;
    },
  },
});
