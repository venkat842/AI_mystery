import mongoose from 'mongoose';
const CaseSchema = new mongoose.Schema({
  title:String, premise:String, story:String, difficulty:String,
  suspects:[{id:String,name:String,role:String,description:String,alibi:String}],
  clues:[{id:String,text:String,discovered:Boolean}], hints:[String], hintsUsed:{type:Number,default:0},
  culpritId:String, solution:String, accusation:String, score:Number, completed:{type:Boolean,default:false},
}, {timestamps:true});
export default mongoose.models.Case || mongoose.model('Case', CaseSchema);
