"use client"

import MainLayout from "@/components/layouts/mainLayout"
import { HadistCard } from "@/components/card/hadistPage"
import { useEffect, useState } from "react"

const fetchHadist = async () => {
  const res = await fetch("https://open-api.my.id/api/doa")
  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }
  return res.json()
}

export default function HadistPage() {
  const [hadist, setHadist] = useState([])
  const [loading, setLoading] = useState(true)

  const getHadist = async () => {
    setLoading(true)
    try {
      const data = await fetchHadist()
      setHadist(data)
    } catch (error) {
      console.error("Error fetching hadist:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getHadist()
  }, [])

  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-screen">
          <div className="loader"></div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="flex flex-col gap-4 py-4">
        {hadist.map((hadistItem: any) => (
          <HadistCard key={hadistItem.id} hadist={hadistItem} />
        ))}
      </div>
    </MainLayout>
  )
}