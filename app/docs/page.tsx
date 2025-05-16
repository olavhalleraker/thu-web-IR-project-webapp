

import { redirect } from "next/navigation";

export default function Page() {
  redirect("/docs/getting-started")
  
  return (
    <div className="m-6">
      <h1 className="text-2xl font-bold">Documentation</h1>
      <p className="text-gray-500">
        This is the documentation page for BIAS Search. You can find information about how to use the app, its features, and more.
      </p>

    </div>
  )
}
