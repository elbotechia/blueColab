import mongoose from "mongoose";
import MongooseDelete from "mongoose-delete";
const AulaSchema = new mongoose.Schema({
  order: {type: Number, required: true},
  lang: {type: String, required: true},
  title: {type: String, required: true},
  description: {type: String, required: true},
  stack: {type: String, enum: ['frontend', 'backend', 'fullstack', 'SQL', 'NoSQL', 'Testing', 'Desktop', 'Machine Learning', 'IA'], required: true},
  duration: {type: String, required: true},
  level: {type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true}
},{
    timestamps: true,
    versionKey: false
});
AulaSchema.plugin(MongooseDelete, { overrideMethods: 'all', deletedAt : true });
export const Aula = mongoose.model('Aula', AulaSchema);