import React, { useState, useEffect } from 'react'
import './posts.css'
import api from '../../api'
import { useHistory } from 'react-router'
import profilePic from './images/profile_image.png'
import { Link } from 'react-router-dom'
import { FaRegThumbsUp, FaHeart } from 'react-icons/fa'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap'
import Postar from '../NovoPost/Postar'

const Posts = () => {
  const [posts, setPosts] = useState([])
  const [authorized, setAuthorized] = useState(false)

  const history = useHistory()

  const getPosts = async () => {
    try {
      let res = await api.get('feeds')
      const data = res.data
      setPosts(data)
      setAuthorized(true)
    } catch (error) {
      console.log(error.response)
      if (error.response.status === 401) {
        history.push('/')
      }
    }
  }

  const handleLikes = async (id) => {
    const update = {
      feedId: id,
      like: true,
    }
    await api.post('reaction', update)
    getPosts()
  }

  const handleLoves = async (id) => {
    const update = {
      feedId: id,
      love: true,
    }

    await api.post('reaction', update)
    getPosts()
  }

  useEffect(() => {
    getPosts()
  }, [])
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)
  return (
    <div>
      {authorized && (
        <Navbar dark expand="md">
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav style={{ marginLeft: 'auto', marginRight: 'auto' }} navbar>
              <NavItem tag="p" style={{ color: '#ffff' }}>
                <Link style={{ textDecoration: 'none' }} to="/">
                  <NavLink>Entrar com outra conta</NavLink>
                </Link>
              </NavItem>
              <NavItem tag="p">
                <Link to="/cadastro" style={{ textDecoration: 'none' }}>
                  <NavLink>Novo cadastro</NavLink>
                </Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      )}

      <div className="container t-container">
        {authorized && <Postar updatePage={getPosts} />}
        <header>
          <h1>{!authorized ? 'Carregando...' : ''}</h1>
        </header>

        <div style={{ marginLeft: '80%', marginBottom: '20px' }}></div>

        <div className="row">
          {posts.map((post) => {
            return (
              <>
                <div
                  style={{ color: 'grey' }}
                  className="col-lg-4  col-md-4 post"
                >
                  <img className="icon" src={profilePic} />
                  <h5 style={{ color: '#e3a602' }}>@{post.author.username}</h5>
                  <p>{post.content}</p>
                  <div className="likes">
                    <span style={{ margin: '25px' }}>
                      <FaRegThumbsUp
                        onClick={() => handleLikes(post.id)}
                        style={{
                          color:
                            post.activeUserLikedIt < 1 ? 'grey' : '#0a84f0',
                          cursor: 'pointer',
                        }}
                      />
                      <span style={{ marginLeft: '5px' }}>{post.likes}</span>
                    </span>
                    <span style={{ margin: '25px' }}>
                      <FaHeart
                        onClick={() => handleLoves(post.id)}
                        style={{
                          color:
                            post.activeUserLovedIt < 1 ? 'grey' : '#FF4136',
                          cursor: 'pointer',
                        }}
                      />
                      <span style={{ marginLeft: '5px' }}>{post.loves}</span>
                    </span>
                  </div>
                </div>
              </>
            )
          })}
        </div>
      </div>
    </div>
    //{' '}
  )
}

export default Posts
