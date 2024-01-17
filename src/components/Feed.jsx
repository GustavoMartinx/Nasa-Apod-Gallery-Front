import React, { useState, useEffect } from 'react';
import Image from './Image';

const Feed = () => {
  
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  // Função para obter as imagens
  const fetchImages = async () => {

    try {
    
        // setIsLoading(true);
        setIsFetching(true);

        const response = await fetch('https://source.unsplash.com/random');
        console.log("Requisição feita")
        const imageUrl = response.url;

        setImages(prevImages => [...prevImages, { url: imageUrl }]);
        // await new Promise(resolve => setTimeout(resolve, 2000));
    
    } catch (error) {
        console.log("Erro ao carregar as imagens", error);
    
    } finally {
      // setIsLoading(false);
      setIsFetching(false);
    }
  };

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    // Verifica se o usuário está próximo ao final da página (aqui definido como 100 pixels)
    if (scrollHeight - scrollTop - clientHeight < 100 && !isLoading && !isFetching) {
      setIsLoading(true);
    }
  };

  // Efeito para carregar mais imagens quando o usuário rolar até o final da página
  useEffect(() => {
    
    // Carregando as imagens iniciais
    fetchImages();

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);



  useEffect(() => {
    // Quando o carregamento estiver completo, resetamos o estado isLoading
    if (isLoading && !isFetching) {
      fetchImages();
      setIsLoading(false);
    }
  }, [isLoading, isFetching]);


  return (
    <div>
      <h1>Feed</h1>
      {images.map((image, index) => (
        <Image key={index} src={image.url} />
      ))}
      {isLoading && <p>Carregando...</p>}
    </div>
  );
};

export default Feed;
