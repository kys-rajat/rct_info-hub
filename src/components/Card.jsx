export default function Card({ title, image, description }) {
  return (
    <div className="card h-100">
      {image && <img src={image} className="card-img-top" alt={title} />}
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        {description && <p className="card-text">{description}</p>}
      </div>
    </div>
  )
}
