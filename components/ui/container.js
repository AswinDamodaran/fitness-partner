export default function Container({children,className=""}){
    return (
        <div className={`px-10 py-3 ${className}`}>
            {children}
        </div>
    )
}