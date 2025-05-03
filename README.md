# 9ja Cuisine Card

A web page showcasing Nigerian dishes, built for the UB_Tech junior developer task.

## Features
- Card with a chef’s profile photo, title, description, and a slider of 3+ dish images.
- Frontend: Vue.js, Vite, Tailwind CSS, Pinia, Swiper.js.
- Images from Unsplash API (small size, `nigerian+traditional+food`), profile photo from Random User API.

## Setup
1. Clone: `git clone https://github.com/oge-u/9ja-Cuisine.git`
2. Install:
   - `cd frontend`
   - `npm install`
   - Add `VITE_UNSPLASH_ACCESS_KEY` to `.env`
   - `npm run dev`

## Notes
- Uses placehold.co for fallback images.
- Swiper delayed until images load to prevent loop warning.
- Unsplash query uses `nigerian+traditional+food` for relevant images.

## Credits
- Unsplash API for dish images.
- Random User API for profile photo.
- Swiper.js for the slider.