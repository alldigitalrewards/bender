FROM node:latest
WORKDIR /app
COPY ./ /app
EXPOSE 80
CMD ["node", "index.js"]
