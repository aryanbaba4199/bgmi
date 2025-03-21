# Use a lightweight Node.js image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first for better caching
COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy the entire backend code (except files in .dockerignore)
COPY . .

# Expose the port your backend runs on (change if necessary)
EXPOSE 5000

# Set environment variables (optional, can also be passed in Cloud Run)
ENV NODE_ENV=production
ENV JWT_SECRET=bgmiAryan@7277984199
ENV MONGODB_URI=mongodb+srv://aryanbaba4199:Aryan7277@cluster0.swtqxeq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
# Start the backend service
CMD ["node", "index.js"]
