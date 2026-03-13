const validate = (schema, source = "body") => {
  return (req, res, next) => {
    const data = req[source];

    const { error, value } = schema.validate(data, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.details.map((d) => d.message)
      });
    }

    if (source === "body") {
      req.body = value;
    } else if (source === "params") {
      req.params = value;
    } else if (source === "query") {
      req.validated = req.validated || {};
      req.validated.query = value;
    }

    next();
  };
};

export default validate;