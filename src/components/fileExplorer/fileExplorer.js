import React, { useState } from "react";
import styles from "./fileExplorer.module.scss";

const starterFiles = [
  {
    key:"1",
    name: "Meta",
    isFolder: true,
    children: [
      {
        key:"1.1",
        name: "Instagram",
        children: [{ name: "Threads", children: [], isFolder: false }],
        isFolder: true,
      },
      {
        key:"1.2",
        name: "Facebook",
        children: [
          {
            key:"1.2.1",
            name: "Marketplace",
            children: [
              { key:"1.2.1.1", name: "Vendors", children: [],isFolder:true },
              { key:"1.2.1.2", name: "Users", children: [],isFolder:false },
            ]
            ,isFolder:true
          },
          {
            key:"1.2.2",
            name: "Social App",
            children: [
              {
                name: "Person",
                children: [
                  { key:"1.2.2.1", name: "Friends", children: [],isFolder:true },
                  { key:"1.2.2.2", name: "Posts", children: [],isFolder:false },
                  { key:"1.2.2.3",name: "Videos", children: [],isFolder:false },
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

const fileExplorerFolderHandler = (folder) => {
  return <>
    <p className={styles.explorerFolder}>{folder.name}</p>
    <div className={styles.explorerFolderContent}>
        {fileExplorerFileHandler(folder.children)}
    </div>
    
  </>
    
};

const fileExplorerFileHandler = (files) => {
  return (
    <>
      {files.map((file) => {
        if(file.isFolder){
            //i.e it is a folder
            return fileExplorerFolderHandler(file)
        }
        return  <p className={styles.explorerFile}>{file.name}</p>
      })}
    </>
  );
};

const FileExplorer = () => {
  const [fileExplorer, setfileExplorer] = useState(starterFiles);
  return (
    <div className={styles.fileExplorer}>
      <div className={styles.fileMain}>
        {fileExplorer.map((fileNFolder) => {
           if (fileNFolder.isFolder) {
            //i.e it is a folder
            return <>
            {fileExplorerFolderHandler(fileNFolder)}
            
            </>
          }
          return <div className={styles.explorerFolderContent}>
        fileExplorerFileHandler(fileNFolder.children);
    </div> 
        })}
      </div>
    </div>
  );
};

export default FileExplorer;
