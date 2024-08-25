import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  userId:{
    type: String,
    required: true
  },
  name:{
    type: String,
    required: true
  },
  phoneNumber:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: false 
  },
  isFavourite:{
    type: Boolean,
    default: false,
  },
  contactType:{
    type: String,
    enum: ['work', 'home', 'personal'],
    required: true,
    default: 'personal',
  },
  photo:{
    type: String,
    required: false,
  }
},
{
  timestamps: true,
}
);

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;