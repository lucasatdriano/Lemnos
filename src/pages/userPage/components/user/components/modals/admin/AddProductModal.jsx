import React, { useState } from 'react';
import CustomInput from '../../../../../../../components/inputs/customInput/Inputs';
import UpdateProductModal from './UpdateProductModal';
import { IoClose } from "react-icons/io5";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

const produtos = [
  {
    id: 1,
    nome: 'Teclado Gamer RGB',
    descricao: 'Teclado mecânico com iluminação RGB',
    imagemPrinc: 'caminho/para/imagem1.jpg',
    imagemDois: 'caminho/para/imagem2.jpg',
    imagemTres: 'caminho/para/imagem3.jpg',
    imagemQuatro: 'caminho/para/imagem4.jpg',
    cor: 'Preto',
    preco: '250.00',
    modelo: 'Gamer123',
    peso: '1.2',
    altura: '3',
    comprimento: '45',
    largura: '15',
    fabricante: 'Marca A',
    categoria: 'Periféricos',
    subCategoria: 'Teclado',
  },
  {
    id: 2,
    nome: 'Mouse Sem Fio',
    descricao: 'Mouse ergonômico com conexão sem fio',
    imagemPrinc: 'caminho/para/imagem5.jpg',
    imagemDois: 'caminho/para/imagem6.jpg',
    imagemTres: 'caminho/para/imagem7.jpg',
    imagemQuatro: 'caminho/para/imagem8.jpg',
    cor: 'Branco',
    preco: '80.00',
    modelo: 'Wireless789',
    peso: '0.8',
    altura: '4',
    comprimento: '10',
    largura: '6',
    fabricante: 'Marca B',
    categoria: 'Periféricos',
    subCategoria: 'Mouse',
  },
];

const categorias = [
  'Periféricos', 'Hardware', 'Computadores', 'Kits', 'Eletronicos',
	'Notebooks e Portateis', 'Video Games', 'Redes e wireless', 
  'Realidade Virtual', 'Casa Inteligente', 'Monitores', ''
];

const subcategoriasPorCategoria = {
  'Periféricos': ['Teclado', 'Mouse', 'Microfone', 'Fone de Ouvido', 'Caixa de Som', 'Mousepad'],
  'Hardware': ['Processadores', 'Placa Mãe', 'Memórias', 'Armazenamento', 'Fonte', 'Coolers', 'Placa de vídeo'],
  'Computadores': ['Computadores Gamers', 'Computadores Workstation'],
  'Kits': ['Upgrade', 'Gamer', 'Periféricos'],
  'Eletronicos': ['Acessórios de Console', 'Carregadores', 'Smart Box', 'Refrigeração'],
  'Notebooks e Portateis': ['Notebooks', 'Tablets', 'Smartphones'],
  'Video Games': ['Portátil', 'Console de Mesa'],
  'Redes e wireless': ['Roteadores', 'Adaptadores', 'Cabos', 'Cabos de Redes', 'Switches', 'Access Point'],
  'Realidade Virtual': ['Óculos'],
  'Casa Inteligente': ['Assistente Virtual', 'Sensores', 'Lâmpadas Inteligentes', 'Controles Smarts'],
  'Monitores': ['Monitores Gamers', 'Monitores Workstation']
};

const Dropdown = ({ isOpen, options, onSelect, filterFunction }) => {
  const filteredOptions = filterFunction ? options.filter(filterFunction) : options;

  return (
    <div className={`dropdown ${isOpen ? 'open' : ''}`}>
     {isOpen &&
        filteredOptions.map((option, index) => (
          <div key={index} className="dropdown-categoria" onClick={() => onSelect(option)}>
            {option}
          </div>
        ))
      }
    </div>
  );
};

export default function ProdutoModal({ onSave, onUpdate, onClose }) {
  const initialFormState = {
    nome: '',
    descricao: '',
    imagemPrinc: '',
    imagemDois: '',
    imagemTres: '',
    imagemQuatro: '',
    cor: '',
    preco: '',
    modelo: '',
    peso: '',
    altura: '',
    comprimento: '',
    largura: '',
    fabricante: '',
    categoria: '',
    subCategoria: '',
  };
  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProdutoListOpen, setIsProdutoListOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubDropdownOpen, setIsSubDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [subcategorias, setSubcategorias] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleChange = (name, value) => {
    setForm(prevForm => ({
      ...prevForm,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: '',
      }));
    }
  };

  const handleNumberChange = (name, value) => {
    if (/^\d*\.?\d*$/.test(value)) {
      handleChange(name, value);
    }
  };

  const handleProdutoListToggle = () => {
    setIsProdutoListOpen(!isProdutoListOpen);
    if (!isProdutoListOpen) {
      setSelectedProduct(null);
    }
  };
  
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSubDropdownToggle = () => {
    setIsSubDropdownOpen(!isSubDropdownOpen);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.nome) {
      newErrors.nome = 'O Nome do produto é obrigatório';
    }
    if (!form.descricao) {
      newErrors.descricao = 'A Descrição do produto é obrigatória';
    }
    if (!form.cor) {
      newErrors.cor = 'A Cor do produto é obrigatória';
    }
    if (!form.preco) {
      newErrors.preco = 'O Preço do produto é obrigatório';
    }
    if (!form.modelo) {
      newErrors.modelo = 'O Modelo do produto é obrigatório';
    }
    if (!form.peso) {
      newErrors.peso = 'O Peso do produto é obrigatório';
    }
    if (!form.altura) {
      newErrors.altura = 'A Altura do produto é obrigatória';
    }
    if (!form.comprimento) {
      newErrors.comprimento = 'O Comprimento do produto é obrigatório';
    }
    if (!form.largura) {
      newErrors.largura = 'A Largura do produto é obrigatória';
    }
    if (!form.fabricante) {
      newErrors.fabricante = 'O Fabricante do produto é obrigatório';
    }
    if (!form.categoria) {
      newErrors.categoria = 'A Categoria do produto é obrigatória';
    }
    if (!form.subCategoria) {
      newErrors.subCategoria = 'A Subcategoria do produto é obrigatória';
    }
    if (!form.imagemPrinc) {
      newErrors.imagemPrinc = 'A Imagem principal do produto é obrigatória';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Dados do produto:', form);
      onSave(form);
      setForm(initialFormState);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Dados do Produto atualizados:', form);
      // onUpdate(form); no futuro
      setForm(initialFormState);
      setSelectedProduct(null);
    }
  };

  const handleSubCategoriaChange = (option) => {
    handleChange('subCategoria', option);
    setIsSubDropdownOpen(false);
  };
  
  const handleCategoriaChange = (option) => {
    setSelectedCategory(option);
    handleChange('categoria', option);
    setIsDropdownOpen(false);
    setIsSubDropdownOpen(true);
    setSubcategorias(subcategoriasPorCategoria[option] || []);
    handleChange('subCategoria', ''); 
  };

  const selectProduto = (produto) => {
    setForm(produto);
    setIsProdutoListOpen(false);
    setSelectedProduct(produto);
  };

  const isProductSelected = () => {
    return selectedProduct !== null;
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="containerModal" onClick={(e) => e.stopPropagation()}>
        <h2>Adicionar/Atualizar Produto</h2>
        <div className="modalProduto">
          <p>
            <CustomInput
              type="text"
              label="Nome do Produto:"
              id="nome"
              name="nome"
              maxLength={100}
              value={form.nome}
              onChange={(e) => handleChange('nome', e.target.value)}
            />
            {errors.nome && <span className='invalid'>{errors.nome}</span>}
          </p>

          <p>
            <CustomInput
              type="text"
              label="Descrição:"
              id="descricao"
              name="descricao"
              maxLength={255}
              value={form.descricao}
              onChange={(e) => handleChange('descricao', e.target.value)}
            />
            {errors.descricao && <span className='invalid'>{errors.descricao}</span>}
          </p>

          <p>
            <CustomInput
              type="text"
              label="Cor:"
              id="cor"
              name="cor"
              maxLength={30}
              value={form.cor}
              onChange={(e) => handleChange('cor', e.target.value)}
            />
            {errors.cor && <span className='invalid'>{errors.cor}</span>}
          </p>

          <p>
            <CustomInput
              type="text"
              label="Preço:"
              id="preco"
              name="preco"
              mask="NUMBERS"
              value={form.preco}
              onChange={(e) => handleNumberChange('preco', e.target.value)}
            />
            {errors.preco && <span className='invalid'>{errors.preco}</span>}
          </p>

          <p>
            <CustomInput
              type="text"
              label="Imagem Principal:"
              id="imagemPrinc"
              name="imagemPrinc"
              value={form.imagemPrinc}
              onChange={(e) => handleChange('imagemPrinc', e.target.value)}
            />
            {errors.imagemPrinc && <span className='invalid'>{errors.imagemPrinc}</span>}
          </p>

          <p>
            <CustomInput
              type="text"
              label="Imagem Dois:"
              id="imagemDois"
              name="imagemDois"
              value={form.imagemDois}
              onChange={(e) => handleChange('imagemDois', e.target.value)}
            />
          </p>

          <p>
            <CustomInput
              type="text"
              label="Imagem Três:"
              id="imagemTres"
              name="imagemTres"
              value={form.imagemTres}
              onChange={(e) => handleChange('imagemTres', e.target.value)}
            />
          </p>

          <p>
            <CustomInput
              type="text"
              label="Imagem Quatro:"
              id="imagemQuatro"
              name="imagemQuatro"
              value={form.imagemQuatro}
              onChange={(e) => handleChange('imagemQuatro', e.target.value)}
            />
          </p>

          <p>
            <CustomInput
              type="text"
              label="Categoria:"
              id="categoria"
              name="categoria"
              maxLength={30}
              value={form.categoria}
              onChange={(e) => handleChange('categoria', e.target.value)}
            />
            {isDropdownOpen ? 
              <RiArrowDropUpLine className='iconDrop' onClick={handleDropdownToggle}/> 
            : 
              <RiArrowDropDownLine className='iconDrop' onClick={handleDropdownToggle}/>
            }
            <Dropdown
              isOpen={isDropdownOpen}
              options={categorias}
              onSelect={(option) => {
                handleCategoriaChange(option);
                setIsDropdownOpen(false);
                setIsSubDropdownOpen(true);
              }}
              filterFunction={(option) => option.toLowerCase().includes(searchTerm.toLowerCase())}
            />
            {errors.categoria && <span className='invalid'>{errors.categoria}</span>}
          </p>

          <p>
            <CustomInput
              type="text"
              label="Subcategoria:"
              id="subCategoria"
              name="subCategoria"
              maxLength={30}
              value={form.subCategoria}
              onFocus={handleSubDropdownToggle}
              onChange={(e) => {
                setIsSubDropdownOpen(false);
              }}
            />
            {isSubDropdownOpen ? 
              <RiArrowDropUpLine className='iconDrop' onClick={handleSubDropdownToggle}/> 
            : 
              <RiArrowDropDownLine className='iconDrop' onClick={handleSubDropdownToggle}/>
            }
            <Dropdown
              isOpen={isSubDropdownOpen}
              options={subcategorias}
              onSelect={(option) => {
                handleSubCategoriaChange(option);
                setIsSubDropdownOpen(false);
              }}
              filterFunction={(option) => option.toLowerCase().includes(searchTerm.toLowerCase())}
            />
            {errors.subCategoria && <span className='invalid'>{errors.subCategoria}</span>}
          </p>

          <p>
            <CustomInput
              type="text"
              label="Modelo:"
              id="modelo"
              name="modelo"
              maxLength={30}
              value={form.modelo}
              onChange={(e) => handleChange('modelo', e.target.value)}
            />
            {errors.modelo && <span className='invalid'>{errors.modelo}</span>}
          </p>

          <p>
            <CustomInput
              type="text"
              label="Peso (kg):"
              id="peso"
              name="peso"
              maxLength={6}
              mask="NUMBERS"
              value={form.peso}
              onChange={(e) => handleNumberChange('peso', e.target.value)}
            />
            {errors.peso && <span className='invalid'>{errors.peso}</span>}
          </p>

          <p>
            <CustomInput
              type="text"
              label="Altura (cm):"
              id="altura"
              name="altura"
              maxLength={6}
              mask="NUMBERS"
              value={form.altura}
              onChange={(e) => handleNumberChange('altura', e.target.value)}
            />
            {errors.altura && <span className='invalid'>{errors.altura}</span>}
          </p>

          <p>
            <CustomInput
              type="text"
              label="Comprimento (cm):"
              id="comprimento"
              name="comprimento"
              maxLength={6}
              mask="NUMBERS"
              value={form.comprimento}
              onChange={(e) => handleNumberChange('comprimento', e.target.value)}
            />
            {errors.comprimento && <span className='invalid'>{errors.comprimento}</span>}
          </p>

          <p>
            <CustomInput
              type="text"
              label="Largura (cm):"
              id="largura"
              name="largura"
              maxLength={6}
              mask="NUMBERS"
              value={form.largura}
              onChange={(e) => handleNumberChange('largura', e.target.value)}
            />
            {errors.largura && <span className='invalid'>{errors.largura}</span>}
          </p>

          <p>
            <CustomInput
              type="text"
              label="Fabricante:"
              id="fabricante"
              name="fabricante"
              maxLength={50}
              value={form.fabricante}
              onChange={(e) => handleChange('fabricante', e.target.value)}
            />
            {errors.fabricante && <span className='invalid'>{errors.fabricante}</span>}
          </p>
        </div>
        <div className="containerButtons">
          <button type='button' onClick={handleSave}  disabled={isProductSelected()}>Adicionar</button>
          <button type='button' onClick={handleUpdate}  disabled={!isProductSelected()}>Atualizar</button>
          <button type='button' onClick={handleProdutoListToggle}>Mostrar Lista</button>
        </div>
        <IoClose onClick={onClose} className='iconClose' />
      </div>
      {isProdutoListOpen && (
        <UpdateProductModal produtos={produtos} onSelect={selectProduto} onClose={handleProdutoListToggle}/>
      )}
    </div>
  );
}