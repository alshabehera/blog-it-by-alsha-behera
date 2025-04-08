import React from 'react'
import { MenuHorizontal } from "@bigbinary/neeto-icons";
import { Dropdown } from "@bigbinary/neetoui";
import { convertCategories } from './utils';

const Table = ({userPosts,handlePublish,handleDelete}) => {

    const { Menu, MenuItem, Divider } = Dropdown;
    const {Button : MenuItemButton} = MenuItem;
  return (
    <table className="w-full border-collapse mt-4">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">TITLE</th>
                <th className="text-left p-2">CATEGORY</th>
                <th className="text-left p-2">LAST PUBLISHED AT</th>
                <th className="text-left p-2">STATUS</th>
                <th className="text-left p-2"></th>
              </tr>
            </thead>
            <tbody>
              {userPosts.map((post) => (
                <tr key={post.id} className="border-b">
                  <td className="p-2">{post.title}</td>
                  <td className="p-2">{convertCategories(post.categories)}</td>
                   <td className="p-2">{post.formatted_last_published_date               }</td>
                  <td className="p-2">{post.status == "Publish"? "Published" : "Draft"}</td>
                  <td className="p-2">
                     <Dropdown
                        icon={MenuHorizontal}
                        buttonStyle="text"
                          closeOnSelect >
                      <Menu>
                        {post.status === "Publish" ? (
                          <MenuItemButton onClick={() => handlePublish(post.slug,"Draft")}>Unpublish</MenuItemButton>
                        ) : (
                          <MenuItemButton onClick={() => handlePublish(post.slug,"Publish")}>Publish</MenuItemButton>
                        )}
                        <Divider />
                        <MenuItemButton className="text-red-500" onClick={() => handleDelete(post.slug)}>
                          Delete
                        </MenuItemButton>
                      </Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
  )
}

export default Table