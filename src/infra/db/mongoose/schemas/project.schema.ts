import { Project } from '@app/core/interfaces/project.interface';
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export const ProjectSchema = new mongoose.Schema<Project>({
  name: { type: String, required: true },
  enabled: { type: Boolean, default: true },
  hoursPrice: { type: Number, default: 0 },
  expectedHoursPerDay: { type: Number, default: 0 },
  hashId: { type: String, default: uuidv4() },
});

export const ProjectModel: mongoose.Model<Project> = mongoose.model('projects', ProjectSchema);
