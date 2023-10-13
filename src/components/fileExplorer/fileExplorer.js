import React, { useState } from "react";
import styles from "./fileExplorer.module.scss";

import Delete from "../../assets/svg/delete"

const starterFiles = [
  {
    key: "0",
    name: "Meta",
    isFolder: true,
    children: [
      {
        key: "0.0",
        name: "Instagram",
        children: [
          { key: "0.0.0", name: "Threads", children: [], isFolder: false },
        ],
        isFolder: true,
      },
      {
        key: "0.1",
        name: "Facebook",
        children: [
          {
            key: "0.1.0",
            name: "Marketplace",
            children: [
              { key: "0.1.0.0", name: "Vendors", children: [], isFolder: true },
              { key: "0.1.0.1", name: "Users", children: [], isFolder: false },
            ],
            isFolder: true,
          },
          {
            key: "0.1.1",
            name: "Social App",
            isFolder: false,
            children: [
              {
                name: "Person",
                key: "0.1.1.0",
                children: [
                  {
                    key: "0.1.1.0.0",
                    name: "Friends",
                    children: [],
                    isFolder: true,
                  },
                  {
                    key: "0.1.1.0.1",
                    name: "Posts",
                    children: [],
                    isFolder: false,
                  },
                  {
                    key: "0.1.1.0.2",
                    name: "Videos",
                    children: [],
                    isFolder: false,
                  },
                ],
              },
            ],
          },
        ],
        isFolder: true,
      },
    ],
  },
];

const FileExplorer = () => {
  const [fileExplorer, setFileExplorer] = useState(starterFiles);

   const deleteElementByKey = (arr, targetKey) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].key === targetKey) {
        arr.splice(i, 1);
        return true; // Element found and deleted
      }

      if (arr[i].children && arr[i].children.length > 0) {
        // Recursively check children
        const childDeleted = deleteElementByKey(arr[i].children, targetKey);

        if (childDeleted && arr[i].children.length === 0) {
          // If the last child was deleted, remove the 'children' property
          delete arr[i].children;
        }

        if (childDeleted) {
          return true; // Stop further searching if the element is found and deleted
        }
      }
    }

    return false; // Element not found
  };

    const fileNFolderDeleteHandler = (fileNfolder) => {
    setFileExplorer((prev) => {
      // Create a deep copy of the state before modifying it
      const newState = JSON.parse(JSON.stringify(prev));
      deleteElementByKey(newState, fileNfolder.key);
      return newState;
    });
  };

  const fileExplorerFolderHandler = (folder) => {
    return (
      <>
        <input
          className={styles.hiddenCheckBox}
          type="checkbox"
          id={folder.key + folder.name}
          name={folder.key + folder.name}
        />
        <label
          htmlFor={folder.key + folder.name}
          className={styles.explorerFolder}
        >
          {folder.name}
          <span className={styles.deleteHandler} onClick={() => fileNFolderDeleteHandler(folder)}><Delete/></span>
        </label>
        <div className={styles.explorerFolderContent}>
          {fileExplorerFileHandler(folder.children)}
        </div>
      </>
    );
  };

  const fileExplorerFileHandler = (files) => {
    return (
      <>
        {files?.map((file) => {
          if (file.isFolder) {
            
            return <div key={file.key}>{fileExplorerFolderHandler(file)} </div>;
          }
          return (
            <p className={styles.explorerFile} key={file.key}>
              {file.name}{" "}
              <span className={styles.deleteHandler} onClick={() => fileNFolderDeleteHandler(file)}><Delete/></span>
            </p>
          );
        })}
      </>
    );
  };

  return (
    <div className={styles.fileExplorer}>
      <div className={styles.fileMain}>
        {Array.isArray(fileExplorer) && fileExplorer?.map((fileNFolder) => {
          if (fileNFolder.isFolder) {
            
            return (
              <div key={fileNFolder.key}>
                {fileExplorerFolderHandler(fileNFolder)}
              </div>
            );
          }
          return (
            <div className={styles.explorerFolderContent} key={fileNFolder.key}>
              {fileExplorerFileHandler(fileNFolder.children)}
              <span className={styles.deleteHandler} onClick={() => fileNFolderDeleteHandler(fileNFolder)}><Delete/></span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FileExplorer;
