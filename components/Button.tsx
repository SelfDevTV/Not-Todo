interface Props {
    title: string
    onClick?: () => void
}

export const Button = ({ title, onClick }: Props) => {
    return (
        <button
            onClick={onClick ?? null}
            className="px-2 justify-center border rounded-lg shadow-lg py-2 px-2 my-2"
        >
            {title}
        </button>
    )
}
