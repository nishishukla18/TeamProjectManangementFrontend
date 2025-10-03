import React from 'react'
import { useNavigate } from 'react-router-dom'

function Hero() {
    const navigate = useNavigate()
    
    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center px-6 relative overflow-hidden">
            {/* Background accent shapes */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-green-500 opacity-10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-400 opacity-10 rounded-full blur-3xl"></div>
            
            <div className="max-w-4xl mx-auto text-center relative z-10">
                {/* Main heading */}
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                    Manage your team projects with{' '}
                    <span className="text-green-400">
                        Project Hub
                    </span>
                </h1>
                
                {/* Subheading */}
                <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto">
                    A platform that makes you efficient
                </p>
                
                {/* CTA Button */}
                <button 
                    onClick={()=>navigate('/hub')}
                    className="px-8 py-4 bg-green-500 text-slate-900 text-lg font-bold rounded-lg shadow-xl hover:bg-yellow-400 hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                    Get Started
                </button>
                
                {/* Decorative elements */}
                <div className="mt-16 flex justify-center gap-8 text-gray-400">
                    <div className="flex flex-col items-center">
                        <div className="text-3xl font-bold text-green-400">500+</div>
                        <div className="text-sm">Active Teams</div>
                    </div>
                    <div className="w-px bg-gray-700"></div>
                    <div className="flex flex-col items-center">
                        <div className="text-3xl font-bold text-yellow-400">10K+</div>
                        <div className="text-sm">Projects</div>
                    </div>
                    <div className="w-px bg-gray-700"></div>
                    <div className="flex flex-col items-center">
                        <div className="text-3xl font-bold text-green-400">99%</div>
                        <div className="text-sm">Satisfaction</div>
                    </div>
                </div>
                
                {/* Feature highlights */}
                <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-slate-800 p-6 rounded-lg border-2 border-green-500 hover:border-yellow-400 transition-colors duration-300">
                        <div className="text-4xl mb-3">⚡</div>
                        <h3 className="text-lg font-bold text-white mb-2">Fast & Efficient</h3>
                        <p className="text-gray-400 text-sm">Streamline your workflow</p>
                    </div>
                    <div className="bg-slate-800 p-6 rounded-lg border-2 border-yellow-400 hover:border-green-500 transition-colors duration-300">
                        <div className="text-4xl mb-3">🤝</div>
                        <h3 className="text-lg font-bold text-white mb-2">Team Collaboration</h3>
                        <p className="text-gray-400 text-sm">Work together seamlessly</p>
                    </div>
                    <div className="bg-slate-800 p-6 rounded-lg border-2 border-green-500 hover:border-yellow-400 transition-colors duration-300">
                        <div className="text-4xl mb-3">📊</div>
                        <h3 className="text-lg font-bold text-white mb-2">Track Progress</h3>
                        <p className="text-gray-400 text-sm">Monitor your success</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero