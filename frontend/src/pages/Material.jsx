import React, { useEffect, useState } from 'react';
import { FileText, FileSpreadsheet, Search, Grid, List, Filter, MoreVertical, Download, Upload, Plus, CheckCircle} from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

const Material = () => {
  const darkMode=true;
  const [viewMode, setViewMode] = useState('grid');
  const [select, setSelect] = useState(false);
  const isCoordinator=true;
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
    const data=await axios.get("http://localhost:8080/api/material/getMaterials",{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }); 
    setMaterials(data.data);
  } catch (error) {
    console.error(error);
  }
};
  fetchMaterials();
  },[materials])

  const toggleViewMode = () => setViewMode(viewMode === 'grid' ? 'list' : 'grid');

  const handleFileUpload = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const tag = e.target.tag.value;
    const file = e.target.file.files[0];
    if (!title ||!tag ||!file) return alert('Please fill all fields');
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      try {
        const response = await axios.post(
          "http://localhost:8080/api/material/addMaterial",
          {
            title,
            tag,
            base64Image,
            type: file.type.split('/')[1]
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        toast.success('File uploaded successfully');
        setMaterials([...materials, response.data.data]);
        setShowUploadModal(false);
      } catch (error) {
        console.error(error);
        toast.error('Failed to upload file');
      }
    };
    setShowUploadModal(false);
  };

  const downloadFile = (file) => {
    const pdfUrl = file.link
    window.open(pdfUrl, "_blank");
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-950 text-gray-100' : 'bg-gray-100 text-gray-900'} relative transition-colors duration-200 p-6`}>

      <header className={`${darkMode ? 'bg-gray-950' : 'bg-white'} py-4 px-6 flex items-center justify-between`}>
        <div className="flex items-center">
          <h1 className="text-3xl font-bold">Study Materials</h1>
        </div>
        <div className="flex items-center">
          <div className={`mr-4 px-4 py-2 rounded-full flex items-center ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
            <Search size={16} className="mr-2 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search files..." 
              className={`bg-transparent border-none focus:outline-none w-64 ${darkMode ? 'placeholder-gray-500' : 'placeholder-gray-400'}`} 
            />
          </div>
        </div>
      </header>

      <main className="w-full p-6">

        <div className="flex justify-end items-center mb-6">
          <div className="flex items-center space-x-2">
            {isCoordinator && (
              <button 
                onClick={() => setShowUploadModal(true)} 
                className={`p-2 rounded-lg ${darkMode ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-500 hover:bg-indigo-600'} flex items-center`}
              >
                <Plus size={18} className="mr-1" />
                <span>Add Files</span>
              </button>
            )}
            <button onClick={toggleViewMode} className={`p-2 rounded-lg ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'}`}>
              {viewMode === 'grid' ? <List size={20} /> : <Grid size={20} />}
            </button>
            <button className={`p-2 rounded-lg ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'}`}>
              <Filter size={20} />
            </button>
          </div>
        </div>
            <hr/>
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
            {materials?.length === 0 && (
            <div className={`rounded-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} absolute top-1/2 right-1/2 shadow-sm p-6 text-center`}>
              <h3 className="text-lg font-medium">No files found</h3>
            </div>
          )}
            {materials?.map((file, idx) => (
              <div 
                key={idx + 1} 
                onClick={() => downloadFile(file)}
                className={`${darkMode ? 'bg-gray-900 hover:bg-gray-800 hover:scale-105' : 'bg-white hover:bg-gray-50'} 
                  rounded-lg overflow-hidden shadow-sm cursor-pointer transition-all duration-200 hover:shadow-md`}
              >
                <div className={`h-32 flex items-center justify-center ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  {file?.type === 'xlsx' ? (
                    <FileSpreadsheet size={48} className="text-green-500" />
                  ) : (
                    <FileText size={48} className="text-red-500" />
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <h3 className="font-medium truncate" title={file?.title}>{file?.title}</h3>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-gray-500">Author:{file?.author.username}</span>
                    <span className="text-xs text-gray-500">{file?.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={`rounded-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm mt-5`}>
            <table className="w-full">
              <thead className={`${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'} text-xs uppercase`}>
                <tr>
                  <th className="px-6 py-3 text-left">Name</th>
                  <th className="px-6 py-3 text-left">Modified</th>
                  <th className="px-6 py-3 text-left">Size</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
              {materials?.length === 0 && (
            <div className={`rounded-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} absolute top-1/2 right-1/2 shadow-sm p-6 text-center`}>
              <h3 className="text-lg font-medium">No files found</h3>
            </div>
          )}
                {materials?.map((file, idx) => (
                  <tr 
                    key={idx+1} 
                    onClick={() => downloadFile(file)}
                    className={`${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} cursor-pointer`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <span className="mr-3">{file?.type==="xlsx"?
                        <FileSpreadsheet size={24} className="text-green-500" />:
                        <FileText size={24} className="text-red-500" />
                        }</span>
                        <span className="font-medium">{file?.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{file?.date}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Author:{file?.author.username}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            alert(`Downloading ${file?.title}`);
                          }}
                        >
                          <Download size={16} className="text-gray-400 hover:text-gray-300" />
                        </button>
                        {isCoordinator && (
                          <button onClick={(e) => e.stopPropagation()}>
                            <MoreVertical size={16} className="text-gray-400 hover:text-gray-300" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
      
      {showUploadModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl p-6 max-w-lg w-full mx-4`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Add New Study Material</h3>
              <button 
                onClick={() => setShowUploadModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                ✕
              </button>
            </div>
            <form onSubmit={(e)=>handleFileUpload(e)}>
            <div className="mb-4">
              <label className={`block mb-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Title
              </label>
              <input 
                type="text" 
                id='title'
                name='title'
                className={`w-full p-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                placeholder="Enter file title"
              />
            </div>

            <div className="mb-4">
              <label className={`block mb-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Tag
              </label>
              <input 
                type="text" 
                id='tag'
                name='tag'
                className={`w-full p-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                placeholder="Enter tag for file"
              />
            </div>
            
            <div className="mb-6">
              <label className={`block mb-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                File
              </label>
              <label htmlFor="fileInput">
      <div
        className={`border-2 border-dashed transition-all duration-200 ${
          select
            ? "border-green-500 bg-gray-700"
            : "border-gray-300 bg-gray-700 hover:border-indigo-500"
        } rounded-lg p-6 md:p-8 text-center cursor-pointer`}
      >
        {select ? (
          <>
            <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
            <p className="mt-1 text-xs text-green-500">File Selected</p>
          </>
        ) : (
          <>
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-4 text-sm font-medium text-gray-500">
              Click to browse files
            </p>
            <p className="mt-1 text-xs text-gray-400">
              PDF, Excel, Word, or other study materials
            </p>
          </>
        )}
        <input
          type="file"
          id="fileInput"
          name="file"
          className="hidden"
          onChange={()=>setSelect(true)}
          accept=".pdf, .xls, .xlsx, .csv, .doc, .docx, .txt"
        />
      </div>
    </label>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setShowUploadModal(false)}
                className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
              >
                Cancel
              </button>
              <button 
                type="submit"
                className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-500 hover:bg-indigo-600'} text-white`}
              >
                Upload
              </button>
            </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Material;