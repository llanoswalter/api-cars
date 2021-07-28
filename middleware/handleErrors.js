module.exports = (error, request, response, next) => {
  if (error._message == "Car validation failed") {
    return response.status(402).end();
  } else if (error.error == "params is requieres") {
    return response.status(402).end();
  } else if (error.path == "_id") {
    return response.status(402).end();
  }
  console.log(error);
};
