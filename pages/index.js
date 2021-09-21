import Head from 'next/head'
import {Bar} from 'react-chartjs-2';
import React, { useState, useEffect } from 'react';

//Função principal. Main que renderiza o html
export default function Home({data_q = {"nome" : 12}}) {  
  const tipos_produtos = Object.entries(data_q);
  const nome_produtos = new Array()
  const quantia_produtos = new Array()

  const [categoria, setCategoria] = useState("");

  tipos_produtos.map((item) => {
    nome_produtos.push(titleCase(item[0].replace(/_/g, "")))
    quantia_produtos.push(item[1])
  })

  const data = {
    labels: nome_produtos,
    datasets: [{
      label: 'Tipos de produtos',
      data: quantia_produtos,
      backgroundColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 2
    }]
  }

  const handleClick = (e) => {
    setCategoria(nome_produtos[e])
    const elementos = getByProductType(tipos_produtos[e][0])
  }
  
  return (
    <div>
      <Head>
        <title>Azeplast - Teste Carlos</title>
        <meta name="description" content="Teste de desenvolvimento Azeplast" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className="container m-20 grid grid-cols-2 grid-flow-row text-center mx-auto">
          <div className="bg-white">
            <Bar
              data={data}
              width={830}
              height={490}
              options={{
                maintainAspectRatio: false
              }}
            />
          </div>
          <div className="grid max-w-xl justify-center max-h-60">
            {tipos_produtos.map((post, index) => {
              return (
                <a key={index} className="cursor-pointer" onClick={() => handleClick(index)}><div className="cards bg-white w-96 border-1 shadow-md m-1 p-2 align-middle font-semibold">{nome_produtos[index]}</div></a>
              )})
            }
          </div>
          <div className="col-span-2 max-h-60 mt-40">
            <h1 className="font-semibold text-4xl">Categoria: {categoria}</h1>
            <div id="produtos_pelo_tipo" className="cards grid justify-center mt-12 mb-12 overflow-y-scroll max-h-72">
              <div className="bg-white w-96 border-1 p-2 m-1 shadow-md font-semibold"></div>
            </div>
          </div>
      </main>
    </div>
  )
}

//Static props: junta os requests necessários para inicialização
export async function getStaticProps() {
  const query = await fetch(`http://192.168.30.87:3000/api/productsTypes`)
  try {
    const data_q = await query.json() 
    if (!data_q) {
      return {
        redirect: {
          destination: '/err',
          permanent: false,
        },
      }
    }
  
    return {
      props: { 
        data_q, 
      } // manda pra main as necessidades (os props)
    }
  } catch (error) {
    const data_q = {}
    return {
      props: { 
        data_q, 
      } // manda pra main as necessidades (os props)
    }
  }
}

//Pegar produtos de tipo em especifico
export async function getByProductType(element){
  const query = await fetch(`/api/products?type=${element}`)
  const data = await query.json()
  document.getElementById('produtos_pelo_tipo').innerHTML = ""

  data.map((item) => {
    var div = document.createElement('div');
    div.setAttribute("class","bg-white w-96 border-1 p-2 m-1 shadow-md font-semibold")
    div.textContent = item.id + " - " + item.name
    document.getElementById('produtos_pelo_tipo').appendChild(div)
  })
}

//Função para formatar nome dos tipos de produtos. API original não disponibiliza
function titleCase(str) {
  var splitStr = str.toLowerCase().split(' ');
  for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
  }
  return splitStr.join(' '); 
}

