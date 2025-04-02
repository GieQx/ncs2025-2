// Sample resources data
const resourcesData = [
  {
    id: 1,
    title: "Statistical Analysis Methods: A Comprehensive Guide",
    description: "A detailed overview of contemporary statistical methodologies and their applications in various fields.",
    fileType: "pdf",
    fileSize: "2.4 MB",
    publishDate: "May 15, 2024",
    downloadUrl: "#"
  },
  {
    id: 2,
    title: "Economic Indicators Dataset (2020-2024)",
    description: "Comprehensive dataset containing economic indicators and statistical metrics from multiple countries.",
    fileType: "excel",
    fileSize: "5.7 MB",
    publishDate: "June 3, 2024",
    downloadUrl: "#"
  },
  {
    id: 3,
    title: "Statistical Visualization Techniques Presentation",
    description: "Slides from the keynote presentation on advanced techniques for visualizing complex statistical data.",
    fileType: "powerpoint",
    fileSize: "8.1 MB",
    publishDate: "June 10, 2024",
    downloadUrl: "#"
  }
];

const toolsData = [
  {
    id: 1,
    name: "StatPro Analytics",
    icon: "chart-bar",
    color: "primary"
  },
  {
    id: 2,
    name: "DataViz Studio",
    icon: "calculator",
    color: "green-600"
  },
  {
    id: 3,
    name: "ModelMaker Pro",
    icon: "microscope",
    color: "violet-600"
  }
];

const Resources = () => {
  const getFileTypeIcon = (fileType: string) => {
    switch (fileType) {
      case 'pdf':
        return <i className="fas fa-file-pdf text-primary"></i>;
      case 'excel':
        return <i className="fas fa-file-excel text-green-600"></i>;
      case 'powerpoint':
        return <i className="fas fa-file-powerpoint text-violet-600"></i>;
      default:
        return <i className="fas fa-file text-primary"></i>;
    }
  };

  const getFileTypeColor = (fileType: string) => {
    switch (fileType) {
      case 'pdf':
        return 'primary';
      case 'excel':
        return 'green-600';
      case 'powerpoint':
        return 'violet-600';
      default:
        return 'primary';
    }
  };

  return (
    <section id="resources" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Resources & Downloads</h2>
          <p className="text-lg text-neutral-600">
            Access research papers, presentations, statistical datasets, and other valuable materials.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resourcesData.map((resource) => (
            <div key={resource.id} className="bg-white rounded-xl shadow-sm overflow-hidden group hover:shadow-md transition-shadow duration-300">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-10 h-10 rounded-lg bg-${getFileTypeColor(resource.fileType)}/10 flex items-center justify-center`}>
                    {getFileTypeIcon(resource.fileType)}
                  </div>
                  <span className="text-xs text-neutral-500">{resource.fileSize}</span>
                </div>
                <h3 className="font-bold text-lg mb-2">{resource.title}</h3>
                <p className="text-sm text-neutral-600 mb-4">
                  {resource.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-neutral-500">Published: {resource.publishDate}</span>
                  <a 
                    href={resource.downloadUrl} 
                    className={`text-${getFileTypeColor(resource.fileType)} hover:text-${getFileTypeColor(resource.fileType)}-dark transition-colors text-sm font-medium flex items-center`}
                  >
                    <span>Download</span>
                    <i className="fas fa-download ml-2"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16">
          <div className="bg-neutral-50 rounded-xl p-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-2">Statistical Tools Showcase</h3>
                <p className="text-neutral-600 mb-4">
                  Browse and try demo versions of cutting-edge statistical software and analysis tools.
                </p>
                <button className="bg-primary text-white rounded-full py-2 px-6 text-sm font-medium hover:bg-blue-700 transition-colors duration-300">
                  Explore Tools Library
                </button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
                {toolsData.map((tool) => (
                  <div key={tool.id} className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300 text-center">
                    <div className={`w-12 h-12 mx-auto bg-${tool.color}/10 rounded-lg flex items-center justify-center mb-3`}>
                      <i className={`fas fa-${tool.icon} text-${tool.color}`}></i>
                    </div>
                    <h4 className="font-medium text-sm">{tool.name}</h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resources;
