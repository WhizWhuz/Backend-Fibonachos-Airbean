exports.validateAddMenuItem = (req, res, next) => {
	const { name, description, price } = req.body;

	//price === undefined because price === 0 would return "false" & would be flagged as missing
	if (!name || !description || price === undefined) {
		return res
			.status(400)
			.json({ message: "Missing name, decription and/or price" });
	}

	if (
		typeof name !== "string" ||
		typeof description !== "string" ||
		typeof price !== "number"
	) {
		return res.status(400).json({
			message:
				"Invalid data type: Name & description must be strings, price must be a number",
		});
	}

	if (price <= 0) {
		return res.status(400).json({ message: "Price must be higher than 0" });
	}

	next();
};

exports.validateUpdateMenuItem = (req, res, next) => {
	const { name, description, price } = req.body;

	if (name === undefined && description === undefined && price === undefined) {
		return res
			.status(400)
			.json({ message: "At least one field must be provided to update" });
	}

	if (price !== undefined) {
		if (typeof price !== "number" || price <= 0) {
			return res
				.status(400)
				.json({ message: "Price must be a number and/or higher than 0" });
		}
	}

	if (name && typeof name !== "string") {
		return res.status(400).json({ message: "Name must be a string" });
	}

	if (description && typeof description !== "string") {
		return res.status(400).json({ message: "Description must be a string" });
	}

	next();
};
