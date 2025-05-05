import React, { useEffect, useState } from "react";
import { MenuHorizontal } from "@bigbinary/neeto-icons";
import {
  Dropdown,
  Checkbox,
} from "@bigbinary/neetoui";
import { convertCategories } from "./utils";

const Table = ({
  userPosts,
  handlePublish,
  handleDelete,
  showColumns,
  selectedPosts,
  setSelectedPosts,
}) => {
  const [selectAll, setSelectAll] = useState(false);
  const { Menu, MenuItem, Divider } = Dropdown;
  const { Button: MenuItemButton } = MenuItem;

  const allPostIds = userPosts.map((post) => post.id);

  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedPosts((prev) =>
        prev.filter((id) => !allPostIds.includes(id))
      );
    } else {
      const newSelections = allPostIds.filter((id) => !selectedPosts.includes(id));
      setSelectedPosts((prev) => [...prev, ...newSelections]);
    }
    setSelectAll(!selectAll);
  };

  const handleCheckboxChange = (postId) => {
    setSelectedPosts((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId]
    );
  };

  useEffect(() => {
    const allSelected = allPostIds.every((id) => selectedPosts.includes(id));
    setSelectAll(allSelected);
  }, [selectedPosts, userPosts]);

  return (
    <>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="p-2">
              <Checkbox
                checked={selectAll}
                onChange={handleSelectAllChange}
              />
            </th>
            {showColumns["Title"] && <th className="text-left p-2">Title</th>}
            {showColumns["Category"] && (
              <th className="text-left p-2">Category</th>
            )}
            {showColumns["Last Published at"] && (
              <th className="text-left p-2">Last Published at</th>
            )}
            {showColumns["Status"] && (
              <th className="text-left p-2">Status</th>
            )}
            <th className="text-left p-2"></th>
          </tr>
        </thead>
        <tbody>
          {userPosts.map((post) => (
            <tr key={post.id} className="border-b">
              <td className="p-2">
                <Checkbox
                  checked={selectedPosts.includes(post.id)}
                  onChange={() => handleCheckboxChange(post.id)}
                />
              </td>
              {showColumns["Title"] && <td className="p-2">{post.title}</td>}
              {showColumns["Category"] && (
                <td className="p-2">{convertCategories(post.categories)}</td>
              )}
              {showColumns["Last Published at"] && (
                <td className="p-2">{post.formatted_last_published_date}</td>
              )}
              {showColumns["Status"] && (
                <td className="p-2">
                  {post.status === "Publish" ? "Published" : "Draft"}
                </td>
              )}
              <td className="p-2">
                <Dropdown icon={MenuHorizontal} buttonStyle="text" closeOnSelect>
                  <Menu>
                    {post.status === "Publish" ? (
                      <MenuItemButton
                        onClick={() => handlePublish(post.slug, "Draft")}
                      >
                        Unpublish
                      </MenuItemButton>
                    ) : (
                      <MenuItemButton
                        onClick={() => handlePublish(post.slug, "Publish")}
                      >
                        Publish
                      </MenuItemButton>
                    )}
                    <Divider />
                    <MenuItemButton
                      className="text-red-500"
                      onClick={() => handleDelete(post.slug)}
                    >
                      Delete
                    </MenuItemButton>
                  </Menu>
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </>
  );
};

export default Table;
