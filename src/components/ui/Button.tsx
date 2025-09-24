

export default function Button({title}: {title: string}) {
  return (
    <button className="px-3 py-1 rounded-md text-white bg-primary dark:bg-primary-dark hover:opacity-60 transition-all">
        {title}
    </button>
  )
}
