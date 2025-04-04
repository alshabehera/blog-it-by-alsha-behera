import React from 'react'
import { Down, ExternalLink, MenuHorizontal } from "@bigbinary/neeto-icons";
import { Dropdown, Button } from "@bigbinary/neetoui";
import { useHistory } from 'react-router-dom';

const Header = ({actionType,setActionType,handleDelete,handleSubmit,handlePreview,showMenu}) => {
  const history = useHistory();
  const { Menu, MenuItem, Divider } = Dropdown;
  const {Button : MenuItemButton} = MenuItem

  return (
    <div className="flex justify-end gap-2 mt-7">
     { showMenu && 
     <Button
 icon={ExternalLink}
 onClick={() => {
  handlePreview();
}}
 style="text"

/>}
           <button
             className="bg-slate-100 border border-stone-400 rounded-md px-5 text-black"
             onClick={() => history.push("/")}
           >
             Cancel
           </button>
           
           <button 
             className="bg-black border border-black rounded-md px-5 text-white"
             onClick={handleSubmit}
           >
             {actionType}
           </button>
           <div className="relative bg-slate-100 border rounded-md mt-1">
           <Dropdown
       icon={Down}
       buttonStyle="text"
       closeOnSelect
   
     > <Menu>
     <MenuItemButton onClick={() => setActionType("Publish")}>
       Publish
       </MenuItemButton>
     <Divider />
     <MenuItemButton onClick={() => setActionType("Save as draft")}>
       Save as draft
     </MenuItemButton>
   </Menu>
     </Dropdown>
     </div>
          {showMenu && 
            <Dropdown
                icon={MenuHorizontal}
                buttonStyle="text">
                <MenuItemButton style="danger" onClick={handleDelete}>
                   Delete
                </MenuItemButton>
            </Dropdown>
            }
         </div>
  )
}

export default Header