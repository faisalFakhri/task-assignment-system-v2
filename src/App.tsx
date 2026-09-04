import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import Dashboard from './pages/Dashboard'
import Tasks from './pages/Tasks'
import TaskDetail from './pages/TaskDetail'
import Settings from './pages/Settings'
import MasterData from './pages/MasterData'
import ImportExport from './pages/ImportExport'
import Guide from './pages/Guide'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/tasks/:id" element={<TaskDetail />} />
        <Route path="/master/:type" element={<MasterData />} />
        <Route path="/import" element={<ImportExport />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/guide" element={<Guide />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
