import React from 'react'
import Input from '../../commons/input'
import postsApi from '../../../apis/posts'
import { useHistory } from 'react-router-dom'

const Form = ({title,description,setTitle,setDescription}) => {
  const history = useHistory();
  const handleSubmit = async () => {
    try{
      await postsApi.submit({title,description})
      history.push("/")
    }
    catch(error){
console.log(error);
    }
  }

  return (
    <div>
   <div>
    <Input
  label="Title*"
  value= {title}
  onChange= {({target})=>{setTitle(target.value)}}
  placeholder="Enter title"
  required
  className = ""/>
    <div>
    <Input
  label="Description*"
  value= {description}
  onChange= {({target})=>{setDescription(target.value)}}
  placeholder="Enter description"
  required
  className = ""/>

    </div>
   </div>
   <div className="flex justify-end gap-2">
   <button className="border border-black rounded-md">Cancel</button>
   <button className="border border-black rounded-md" onClick= {handleSubmit}>Submit</button>
   </div>
   </div>

  )
}

export default Form