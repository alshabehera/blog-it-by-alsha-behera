import React, { useState } from 'react'

import { useHistory } from 'react-router-dom';

import { Modal, Typography } from "@bigbinary/neetoui"
import Input from '../commons/Input';
import categoriesApi from '../../apis/categories';

const DetailModal = ({isModalOpen,setIsModalOpen}) => {
  const [title,setTitle]=useState("");
  const history = useHistory();
  const handleSubmit = async () => {
    try {
      await categoriesApi.submit({
        name:title
      });
      history.push("/");
      setIsModalOpen(false);
    } catch (error) {
      logger.error(error);
    }
  };

  return (
  <div className="w-full">
    <div className="space-y-6">
      <div className="space-y-8">
        <div className="flex flex-row flex-wrap items-center justify-start gap-6">
         <Modal
         size="small"
         isOpen={isModalOpen}
         onClose={() => setIsModalOpen(false)}
         closeButton={true}
         >
          <div className="p-5">
            <Typography className="pb-3">
              New category
            </Typography>
         <Input
            label="Category Title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            placeholder="Enter title"
            required
                />
                <button className="bg-black text-white" onClick={handleSubmit}>Add</button>
                </div>
         </Modal>
    </div>
    </div>
    </div>
     
  </div>
  )
}

export default DetailModal;