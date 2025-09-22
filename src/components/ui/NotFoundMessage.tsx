
export default function NotFoundMessage({message}: {message: string}) {
  return (
    <div className="flex justify-center items-center h-[50vh] w-full">
        <p className="px-4 py-2 bg-white text-red-600 rounded-sm text-center border bg-primary">{message}</p>
    </div>
  )
}
