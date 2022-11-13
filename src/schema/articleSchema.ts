import { articles } from "@prisma/client";
import Joi from "joi";

const articleSchema = Joi.object<articles>({
    id: Joi.number().required(),
    featured: Joi.bool(),
    title: Joi.string().required(),
    url: Joi.string().required(),
    imageUrl: Joi.string().required(),
    newsSite: Joi.string().required(),
    summary: Joi.string().min(0),
    launches: Joi.array(),
    events: Joi.array()
});

export default articleSchema;