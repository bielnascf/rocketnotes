import { Container, Links, Content } from './styles.js';

import { Tag } from '../../components/Tag';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Section } from '../../components/Section';
import { ButtonText } from '../../components/ButtonText'


export function Details() {

  return (
    <Container>
      <Header />

      <main>
        <Content>
          <ButtonText title="Excluir nota"/>
          
          <h1>
            Introdução ao React
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus facilis ullam magni? Esse, nobis pariatur provident iure eligendi obcaecati voluptate laudantium. Inventore incidunt porro provident! Cum dolorem labore ullam molestias! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora, at excepturi officiis impedit placeat atque quos ducimus vero dignissimos praesentium optio. Fugiat eos dignissimos illo, quis ducimus beatae veritatis suscipit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla exercitationem nam minima voluptates libero, voluptatum rerum minus ducimus ad quam alias autem cupiditate unde, corporis laudantium, sunt expedita possimus atque?
          </p>

          <Section title="Links úteis">
            <Links>
              <li><a href="#">https://www.rocketseat.com.br</a></li>
              <li><a href="#">https://www.rocketseat.com.br</a></li>
            </Links>
          </Section>

          <Section title="Marcadores">
            <Tag title="express"/>
            <Tag title="node"/>
          </Section>

          <Button title="Voltar"/>
        </Content>
      </main>
    </Container>
  )
}