import React, { useState, useEffect, useRef } from 'react';
import Image from './Image';
import axios from 'axios';

const Feed = () => {

  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef(null);

  // Função para obter as imagens através da API
  const fetchImages = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get('https://source.unsplash.com/random', { responseType: 'arraybuffer' });
      // console.log("Requisição feita com sucesso");

      const imageUrl = response.request.responseURL;
      setImages(prevImages => [...prevImages, { url: imageUrl }]);

    } catch (error) {
      console.error("Erro ao carregar as imagens", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Carrega as imagens iniciais
  useEffect(() => {
    fetchImages();
  }, []);

  // Detecta quando o elemento alvo entra na viewport para realizar a requisição
  const handleIntersection = (entries) => {
    const [entry] = entries;
    if (entry.isIntersecting && !isLoading) {
      fetchImages();
    }
  };
  
  // Configura um IntersectionObserver para observar o elemento alvo ('intersection-target')
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1, // Porcentagem de visibilidade do elemento na viewport. Entre 0 e 1. Quando esse valor for atingido, a função handleIntersection será executada
    };

    observerRef.current = new IntersectionObserver(handleIntersection, options);

    if (observerRef.current) {
      observerRef.current.observe(document.getElementById('intersection-target'));
    }

    // Desconecta o observador quando o componente é desmontado
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);
  


  // =================================
  // Maneira mais simples de fazer um scroll infinito
  // const handleScroll = () => {
  //   if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading) {
  //     return;
  //   }
  //   fetchImages();
  // };
  
  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, [isLoading]);
  // =================================
  


  return (
    <div>
      <h1>Feed</h1>
      {images.map((image, index) => (
        <Image key={index} src={image.url} />
      ))}
      <div id="intersection-target" style={{ height: '10px', background: 'transparent' }}></div>
      {isLoading && <p>Carregando...</p>}
    </div>
  );
};

export default Feed;
