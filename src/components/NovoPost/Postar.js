import React, { useState } from 'react'
import './novopost.css'
import * as yup from 'yup'
import api from '../../api'

const Postar = ({ updatePage }) => {
  const [post, setPost] = useState({ content: '' })

  const contentSchema = yup.object().shape({
    content: yup.string().required(),
  })

  const handleChange = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    })
  }

  const clearField = () => {
    setPost({
      content: '',
    })
  }

  const handlePost = async (e) => {
    const isValid = await contentSchema.isValid(post)

    if (!isValid) {
      alert('Campo não pode estar vazio!')
    } else if (isValid) {
      await contentSchema.validate(post, { abortEarly: false })

      await api.post('feed', post)
      clearField()
      updatePage()
    }
  }
  return (
    <div>
      <input
        placeholder="Novo post..."
        className="postArea form-control"
        onChange={handleChange}
        name="content"
        value={post.content}
      />
      <button onClick={handlePost} className="btn btn-post btn-warning">
        Postar
      </button>
    </div>
  )
}

export default Postar
