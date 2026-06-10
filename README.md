# Selphie

Selphie is a client-side web application that provides an online photobooth experience. It accesses the user's camera, captures a series of photos, composites them into a predefined template, and allows the user to download the final image directly from the browser.

## Architecture

This project is structured around a strict separation between the engine and the template. 
- The engine handles hardware access (`getUserMedia`), rendering routines (`Canvas API`), and export. 
- The template defines the visual configuration and bounding boxes (slots) for the photos.

The application operates entirely on the client side. No images are uploaded to any server. All processing is done locally within the browser.

## Setup and Installation

Install dependencies using npm:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## Production Requirements

Because this application relies on the `getUserMedia` web API to access the camera, it must be served over HTTPS in production. Browsers block camera access on insecure origins (HTTP), except for `localhost`. 

Ensure that your deployment platform (such as Vercel, Netlify, or Cloudflare Pages) automatically provisions and enforces an SSL certificate.

## Technologies Used

- React
- Vite
- Tailwind CSS
- Canvas API
- MediaDevices API (`getUserMedia`)
