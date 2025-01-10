import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Github, Mail, Phone, MousePointer2, MapPin } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "Email Spam Detection",
    description: "Machine Learning system to classify emails as spam or legitimate using Multinomial Naive Bayes and Streamlit.",
    tags: ["Python", "Machine Learning", "NLP", "Streamlit"],
    github: "https://github.com/Tanish3967/P3-Spam-Classification-Email",
    color: "#66f2d5"
  },
  {
    id: 2,
    title: "GDP Analysis",
    description: "Interactive data visualization exploring economic dynamics across various countries using Python and advanced plotting libraries.",
    tags: ["Python", "Data Analysis", "Plotly", "Seaborn"],
    github: "https://github.com/yourusername/gdp-analysis",
    color: "#FF6B6B"
  },
  {
    id: 3, 
    title: "Heart Disease Analysis",
    description: "Comprehensive analysis of factors contributing to heart disease using data visualization techniques.",
    tags: ["Python", "Data Analysis", "Healthcare"],
    github: "https://github.com/yourusername/heart-disease-analysis",
    color: "#4ECDC4"
  }
];

const skills = {
  "Programming Languages": ["Python", "Java", "C++"],
  "Libraries & Frameworks": ["NumPy", "Seaborn", "Matplotlib", "Plotly", "Pandas"],
  "Databases": ["SQL", "MongoDB"],
  "Concepts": ["Object-Oriented Programming", "Data Structures", "Algorithms", "Data Analysis"],
  "Tools & Technologies": ["Git", "Machine Learning", "Generative AI"],
  "Soft Skills": ["Project Management", "Graphic Design", "Leadership"]
};

export default function InteractivePortfolio() {
  const [currentProject, setCurrentProject] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [tonearmRotation, setTonearmRotation] = useState(0);

  useEffect(() => {
    let animationFrame;
    const updateRotation = () => {
      if (isPlaying) {
        setRotation(prev => (prev + 0.5) % 360);
        animationFrame = requestAnimationFrame(updateRotation);
      }
    };
    animationFrame = requestAnimationFrame(updateRotation);
    return () => cancelAnimationFrame(animationFrame);
  }, [isPlaying]);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const angle = (Math.atan2(y, x) * 180) / Math.PI;
      setRotation(angle);
    }
  };

  const handleTonearmDrag = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const angle = Math.min(25, Math.max(0, (y / rect.height) * 25));
    setTonearmRotation(angle);
    setIsPlaying(angle > 20);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* About Section */}
      <div className="max-w-6xl mx-auto p-8">
        <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-2/3">
              <h1 className="text-4xl font-bold mb-4">Tanish Khosla</h1>
              <p className="text-gray-600 mb-6">
                Aspiring Computer Science engineer with hands-on experience in data analysis, 
                software development, and graphic design. Currently pursuing B.Tech at KIIT 
                University with a focus on building impactful projects.
              </p>
              <div className="flex flex-wrap gap-4">
                <span className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>Gurgaon, Haryana</span>
                </span>
                <span className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>tanish3967@gmail.com</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Record Player */}
        <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="relative w-full md:w-1/2">
              <div 
                className="aspect-square bg-gray-900 rounded-lg shadow-inner overflow-hidden cursor-pointer relative"
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseUp}
              >
                <div className="absolute top-4 right-4 text-white flex items-center gap-2">
                  <MousePointer2 className="w-4 h-4" />
                  <span className="text-sm">Drag to spin</span>
                </div>
                
                {/* Record */}
                <div 
                  className="absolute inset-0 m-auto w-4/5 h-4/5 rounded-full bg-gray-800 transition-transform"
                  style={{
                    background: `radial-gradient(circle, ${projects[currentProject].color} 0%, #1a1a1a 70%)`,
                    transform: `rotate(${rotation}deg)`
                  }}
                >
                  {/* Grooves */}
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute inset-0 m-auto rounded-full border border-gray-700"
                      style={{
                        width: `${85 - i * 10}%`,
                        height: `${85 - i * 10}%`,
                        opacity: isPlaying ? '0.8' : '0.4'
                      }}
                    />
                  ))}
                  {/* Label */}
                  <div className="absolute inset-0 m-auto w-2/5 h-2/5 rounded-full bg-white flex items-center justify-center p-4 shadow-lg">
                    <p className="text-sm font-bold text-center">
                      {projects[currentProject].title}
                    </p>
                  </div>
                </div>
                
                {/* Interactive Tonearm */}
                <div 
                  className="absolute top-8 right-8 w-1/3 h-24 cursor-pointer"
                  onMouseMove={handleTonearmDrag}
                  style={{
                    transformOrigin: 'right center'
                  }}
                >
                  <div 
                    className="w-full h-2 bg-gray-300 relative"
                    style={{
                      transform: `rotate(${tonearmRotation}deg)`
                    }}
                  >
                    <div className="absolute left-0 -top-1 w-4 h-4 bg-gray-400 rounded-full shadow-md" />
                  </div>
                </div>
              </div>
            </div>

            {/* Project Info */}
            <div className="w-full md:w-1/2 flex flex-col justify-between">
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">{projects[currentProject].title}</h2>
                <p className="text-gray-600 mb-4">{projects[currentProject].description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {projects[currentProject].tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-gray-200 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Controls */}
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => {
                    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
                    setIsPlaying(false);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
                >
                  {isPlaying ? 'Pause' : 'Play'}
                </button>

                <a
                  href={projects[currentProject].github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Github className="w-6 h-6" />
                </a>

                <button
                  onClick={() => {
                    setCurrentProject((prev) => (prev + 1) % projects.length);
                    setIsPlaying(false);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ArrowRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Skills & Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(skills).map(([category, skillList]) => (
              <div key={category} className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillList.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-gray-200 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Connect Section */}
        <footer className="bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-6">Let's Connect</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="mailto:tanish3967@gmail.com"
              className="flex items-center gap-3 p-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Mail className="w-6 h-6" />
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-sm text-gray-600">tanish3967@gmail.com</p>
              </div>
            </a>
            <a
              href="https://github.com/Tanish3967"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Github className="w-6 h-6" />
              <div>
                <h3 className="font-semibold">GitHub</h3>
                <p className="text-sm text-gray-600">@Tanish3967</p>
              </div>
            </a>
            <a
              href="tel:+919810512783"
              className="flex items-center gap-3 p-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Phone className="w-6 h-6" />
              <div>
                <h3 className="font-semibold">Phone</h3>
                <p className="text-sm text-gray-600">+91 98105 12783</p>
              </div>
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
