import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { PROJECTS } from '../data/projects'
import HimatoDetail from '../components/projects/HimatoDetail'
import ClientProjectDetail from '../components/projects/ClientProjectDetail'
import SEO from '../components/SEO'

const ProjectDetailContainer = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [id])

    // Find Project
    const project = PROJECTS.find(p => p.id === id)

    // Handle Back
    const handleBack = () => {
        navigate('/projects')
    }

    if (!project) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
                    <button onClick={handleBack} className="text-blue-400 hover:text-blue-300">Back to Projects</button>
                </div>
            </div>
        )
    }

    // Render specific detail component based on project ID or type
    if (project.id === 'himato') {
        return <HimatoDetail onBack={handleBack} />
    }

    return (
        <ClientProjectDetail project={project} onBack={handleBack} />
    )
}

export default ProjectDetailContainer
