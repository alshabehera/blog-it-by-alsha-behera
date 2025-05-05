import React, { useEffect, useState } from "react";
import { Button, Checkbox, Typography,ActionDropdown } from "@bigbinary/neetoui";
import postsApi from "../../apis/posts";
import Container from "../commons/Container";
import PageLoader from "../commons/PageLoader";
import { getFromLocalStorage } from "../../utils/storage";
import Table from "./Table";
import Filters from "./Filter";
import { Filter } from "@bigbinary/neeto-icons";
import { useLocation } from "react-router-dom";

const User = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isPaneOpen, setIsPaneOpen] = useState(false);
    const [selectedPosts, setSelectedPosts] = useState([]);
    const location = useLocation();

    const [showColumns, setShowColumns] = useState({
      Title: true,
      Category: true,
      "Last Published at": true,
      Status: true,
    });

   const userId =getFromLocalStorage("authUserId")
   let userPosts = posts.filter(post => post.user.id == userId);

   const { Menu, MenuItem } = ActionDropdown;
   const {Button : MenuItemButton} = MenuItem;
       
   const fetchPosts = async () => {
    const searchParams = new URLSearchParams(location.search);
    const filters = {};

    if (searchParams.get("title")) filters.title = searchParams.get("title");
    if (searchParams.get("status")) filters.status = searchParams.get("status");

    const categoryIds = searchParams.getAll("category_ids");
    if (categoryIds.length > 0) filters.category_ids = categoryIds;

    try {
       const {
              data: { posts },
            } = await postsApi.fetch(filters);
      setPosts(posts);
    } catch (error) {
      console.error("Error fetching filtered posts:", error);
    } finally {
      setLoading(false);
    }
  };
    
      useEffect(() => {
        fetchPosts();
      }, [location.search]);

  const handlePublish = async (slug,status) => {
    try {
      await postsApi.update(slug, {status: status});
      window.location.reload(); 
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleDelete = async (slug) => {
    try {
      await postsApi.destroy(slug);
      window.location.reload(); 
    } catch (error) {
      console.error("Error deleting post:", error);
    }
    
  };

   const handleBulkStatusChange = (newStatus) => {
      const postsToUpdate = userPosts.filter((post) => {
        return selectedPosts.includes(post.id) && post.status !== newStatus;
      });
  
      postsToUpdate.forEach((post) => {
        handlePublish(post.slug, newStatus);
      });
  
      setSelectedPosts([]);
    };

    const handleBulkDelete = async () => {
      try {
        const postsToDelete = userPosts.filter(post => selectedPosts.includes(post.id));
        await Promise.all(postsToDelete.map(post => postsApi.destroy(post.slug)));
    
        setPosts(prev => prev.filter(post => !selectedPosts.includes(post.id)));
        setSelectedPosts([]);
      } catch (error) {
        console.error("Error deleting posts:", error);
      }
    };

  const handleColumnClick = column => {
    if (column === "Title") return;
    setShowColumns(prev => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  const isBulkActionVisible = selectedPosts.length > 0;

  if (loading) {
    return (
      <div>
        <PageLoader />
      </div>
    );
  }

  return (
    <Container title="My blog posts" className="pl-1">
      {userPosts?.length == 0 ? (
        <Typography className="flex justify-center items-center text-center mt-72 text-2xl">
          No posts available.
        </Typography>):(
        <div className="pt-5">
          <div className=" w-full flex justify-between">

            {isBulkActionVisible ? (
                    <div className="flex justify-between items-center bg-gray-50 p-4 rounded mb-3 border w-full">
                      <Typography style="h5">
                        {selectedPosts.length} article{selectedPosts.length > 1 ? "s" : ""} selected of {userPosts.length}
                      </Typography>
                      <div className="flex gap-2">
                        <ActionDropdown label="Change status" buttonStyle="secondary">
                          <Menu>
                            <MenuItemButton onClick={() => handleBulkStatusChange("Draft")}>
                              Draft
                            </MenuItemButton>
                            <MenuItemButton onClick={() => handleBulkStatusChange("Publish")}>
                              Publish
                            </MenuItemButton>
                          </Menu>
                        </ActionDropdown>
                        <Button
                          label="Delete"
                          style="danger"
                          icon="ri-delete-bin-line"
                          onClick={() => handleBulkDelete()}
                        />
                      </div>
                    </div>
                  ):<Typography className="text-gray-700 font-semibold pl-1">{userPosts.length} articles</Typography>
                  }
          
          {!isBulkActionVisible && ( <div>
  <ActionDropdown
    buttonStyle="secondary"
    className="border shadow-xl"
    label="Columns"
  >
    <Menu>
    {Object.keys(showColumns).map(column => (
      <MenuItemButton key={column}>
        <Checkbox
          id={column}
          label={column}
          checked={showColumns[column]}
          disabled={column === "Title"}
          onChange={() => handleColumnClick(column)}
        />
      </MenuItemButton>
    ))}
  </Menu>
  </ActionDropdown>
  <Button
     icon={Filter}
     style="tertiary"
     onClick={() => setIsPaneOpen(true)}
     className="mt-3 ml-2"
    />

  <Filters {...{ isPaneOpen, setIsPaneOpen }} />
 </div>)}
          </div>      
          <Table
  {...{userPosts,
  handlePublish,
  handleDelete,
  showColumns,
  selectedPosts, setSelectedPosts}}
/>
    </div>)}
    </Container>
    
  );
};

export default User;
