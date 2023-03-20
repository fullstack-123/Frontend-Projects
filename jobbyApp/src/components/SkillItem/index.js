import './index.css'

const SkillItem = props => {
  const {skillDetails} = props
  const {name, imageUrl} = skillDetails

  return (
    <li className="skill-list-item" key={name}>
      <img src={imageUrl} alt={name} className="skill-img" />
      <h1 className="skill-name">{name}</h1>
    </li>
  )
}

export default SkillItem
