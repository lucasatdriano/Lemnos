import React, { useState } from 'react';
import { CustomInput } from '../../../../../../../components/inputs/Inputs';
import { IoClose } from "react-icons/io5";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

const categorias = [
  'Periféricos', 'Hardware', 'Computadores', 'Kits', 'Eletrônicos',
	'Notebooks e Portáteis', 'Video Games', 'Redes e wireless', 
  'Realidade Virtual', 'Casa Inteligente', 'Monitores', ''
];

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

export default function ProdutoModal({ onSave, onClose }) {
  const [form, setForm] = useState({
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
  });
  const [errors, setErrors] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (name, file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, [name]: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleSave = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!form.nome) {
      newErrors.nome = 'O Nome do produto é obrigatório';
    }
    if (!form.descricao) {
      newErrors.descricao = 'A Descrição do produto é obrigatória';
    }
    if (!form.imagemPrinc) {
      newErrors.imagemPrinc = 'A Imagem do produto é obrigatória';
    }
    if (!form.cor) {
      newErrors.cor = 'A Cor do produto é obrigatório';
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

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('Dados do produto:', form);
      onSave(form);
      onClose();
    }
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="containerModal" onClick={(e) => e.stopPropagation()}>
        <h2>Adicionar Produto</h2>
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
              maxLength={200}
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
              value={form.preco}
              onChange={(e) => handleChange('preco', e.target.value)}
            />
            {errors.preco && <span className='invalid'>{errors.preco}</span>}
          </p>

          <p>
            <CustomInput
              type="file"
              label="Imagem Principal:"
              id="imagemPrinc"
              name="imagemPrinc"
              onChange={(e) => handleImageChange('imagemPrinc', e.target.files[0])}
            />
            {errors.imagemPrinc && <span className='invalid'>{errors.imagemPrinc}</span>}
          </p>

          <p>
            <CustomInput
              type="file"
              label="Imagem Dois:"
              id="imagemDois"
              name="imagemDois"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  handleImageChange('imagemDois', e.target.files[0]);
                }
              }}
            />
          </p>

          <p>
            <CustomInput
              type="file"
              label="Imagem Três:"
              id="imagemTres"
              name="imagemTres"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  handleImageChange('imagemTres', e.target.files[0]);
                }
              }}
            />
          </p>

          <p>
            <CustomInput
              type="file"
              label="Imagem Quatro:"
              id="imagemQuatro"
              name="imagemQuatro"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  handleImageChange('imagemQuatro', e.target.files[0]);
                }
              }}
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
              onFocus={handleDropdownToggle}
              onChange={(e) => {
                const upperCaseValue = e.target.value.toUpperCase();
                handleSearch(upperCaseValue);
              }}
            />
            {errors.categoria && <span className='invalid'>{errors.categoria}</span>}
            {isDropdownOpen ? 
              <RiArrowDropUpLine className='iconDrop' onClick={handleDropdownToggle}/> 
            : 
              <RiArrowDropDownLine className='iconDrop' onClick={handleDropdownToggle}/>
            }
            <Dropdown
              isOpen={isDropdownOpen}
              options={categorias}
              onSelect={(option) => {
                handleChange('categoria', option);
                setIsDropdownOpen(false);
              }}
              filterFunction={(option) => option.toLowerCase().includes(searchTerm.toLowerCase())}
            />
          </p>

          <p>
            <CustomInput
              type="text"
              label="Subcategoria:"
              id="subCategoria"
              name="subCategoria"
              maxLength={30}
              value={form.subCategoria}
              onChange={(e) => handleChange('subCategoria', e.target.value)}
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
              value={form.peso}
              onChange={(e) => handleChange('peso', e.target.value)}
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
              value={form.altura}
              onChange={(e) => handleChange('altura', e.target.value)}
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
              value={form.comprimento}
              onChange={(e) => handleChange('comprimento', e.target.value)}
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
              value={form.largura}
              onChange={(e) => handleChange('largura', e.target.value)}
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
        <button type='button' onClick={handleSave}>Adicionar</button>
        <IoClose onClick={onClose} className='iconClose' />
      </div>
    </div>
  );
}