# The Ultimate (personal) Meme Manager

**live:** https://patopitaluga.github.io/umm

## Technologies

🟩 Node. Tested on v10.15.0. Might work in different versions.
Express server. Webpack builder.

## Setup
Install node dependencies.
```
npm install
```

### Development
Run
```
npm run dev
```
Will listen for changes and rebuild when necessary. No "hot" reload in the browser yet.

### Add meme from terminal
Copy the images that you want to add to the root folder of the project.

Run the times it's necessary:
```
npm run addmeme
```

### Build for production
Build assets. Will create final assets js files in /public/dist.
```
npm run build
```

Start production/staging server. Will create final asset js files in /public/dist.
```
npm run start
```
