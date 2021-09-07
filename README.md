# Image Processing API

This repository features an image processing API as well as a folder of images to be resized. This API will take an image from the images directory and resize it according to user specifications.

## Requirements

To resize an image, it must first be present in the images folder of the repository.

You must also have the following dependencies installed:

1. TypeScript
2. Express for backend
3. Jasmine for unit testing
4. Eslint for linting
5. Prettier for formatting
6. Sharp for image resizing functionality
7. Supertest to help Jasmine with unit testing.

## Usage

Build the API with `npm run build` and then execute it with `npm run start`. Go to http://localhost:3000/ and then create your query like this `?fileName=<name_of_image>&height=<desired_height>&width=<desired_width>.

## Testing

Execute unit tests with the command `npm run test`.