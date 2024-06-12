import { useEffect } from 'react';
import ScrollReveal from 'scrollreveal';
import './about.scss';
import LogoHorizontalLight from '../../assets/imgLemnos/logoHorizontal.svg';
import LogoHorizontalDark from '../../assets/imgLemnos/logoHorizontalClaro.svg';
import TechFesto from '../../assets/imgLemnos/imgMascote.svg';
import { cadastrarFornecedor, cadastrarProduto } from '../../services/ApiService';

export default function About() {    
    useEffect(() => {
        ScrollReveal().reveal('.text',
        {
            origin: 'left', 
            distance: '100px', 
            duration: 1000,
            delay: 0, 
            easing: 'ease-out', 
            opacity: 0, 
            scale: 1, 
            reset: false, 
        });

        ScrollReveal().reveal('.logoDark, .logoLight, .imgMascot', {
            origin: 'right', 
            distance: '100px', 
            duration: 1000,
            delay: 0, 
            easing: 'ease-out', 
            opacity: 0, 
            scale: 1, 
            reset: false, 
        });

        ScrollReveal().reveal('.item', {
            origin: 'bottom', 
            distance: '100px', 
            duration: 1000,
            delay: 0, 
            easing: 'ease-out', 
            opacity: 0, 
            scale: 1, 
            reset: false, 
        });
    }, []);

    const handleProdutos = () => {
        processarProdutos();
    }

    const handleFornecedores = () => {
        processarFornecedores();
    }

    const produtos = [
        {
            "nome"        : "Amazon Echo Dot (4ª Geração)",
            "descricao"   : "Assistente virtual inteligente com alto-falante embutido, controlado por voz, capaz de reproduzir música, responder perguntas, controlar dispositivos domésticos inteligentes e muito mais.",
            "cor"         : "Antracite",
            "valor"       :  299.90,
            "modelo"      : "Echo Dot 4",
            "peso"        :  0.328,
            "altura"      :  8.9,
            "comprimento" :  10,
            "largura"     :  10,
            "fabricante"  : "Amazon",
            "fornecedor"  : "Amazon Brasil",
            "subCategoria": "Assistente Virtual",
            "imagemPrincipal": "https://live.staticflickr.com/65535/53749334395_eeb6234a7e_w.jpg",
            "imagens": [
                "https://live.staticflickr.com/65535/53749334420_a8dbc0fea1_w.jpg",
                "https://live.staticflickr.com/65535/53749334405_1f63ef9cc3_w.jpg",
                "https://live.staticflickr.com/65535/53748017137_3e2d102642_w.jpg"
            ]
        },     
        {
            "nome"        : "Xiaomi XiaoAI Speaker",
            "descricao"   : "Alto-falante inteligente com assistente virtual XiaoAI da Xiaomi, compatível com vários dispositivos domésticos inteligentes da marca. Oferece reprodução de música, controle de voz e muito mais.",
            "cor"         : "Branco",
            "valor"       : 199.90,
            "modelo"      : "XiaoAI Speaker",
            "peso"        :  0.21,
            "altura"      :  9.2, 
            "comprimento" :  9,
            "largura"     :  9,
            "fabricante"  : "Xiaomi",
            "fornecedor"  : "Mi Store",
            "subCategoria": "Assistente Virtual",
            "imagemPrincipal": "https://live.staticflickr.com/65535/53748026562_05c2126fd7_n.jpg",
            "imagens": [
                "https://live.staticflickr.com/65535/53748947751_d1134e74f0_n.jpg",
                "https://live.staticflickr.com/65535/53749268524_90bce6056c_n.jpg",
                "https://live.staticflickr.com/65535/53748026547_c63d3a10c3_n.jpg"
            ]
            
        }, 
        {
            "nome"        : "Apple Watch Ultra 2",
            "descricao"   : "Este smartwatch inteligente oferece uma variedade de recursos avançados, incluindo monitoramento de atividades físicas, frequência cardíaca, notificações de smartphone e GPS integrado para rastreamento de localização",
            "cor"         : "Azul",
            "valor"       :  199.99,
            "modelo"      : "SW-FT5000",
            "peso"        :  0.05,
            "altura"      :  1.5,
            "comprimento" :  4,
            "largura"     :  4,
            "fabricante"  : "FitTech Wearables Inc",
            "fornecedor"  : "Electronics Emporium",
            "subCategoria": "Assistente Virtual",
            "imagemPrincipal": "https://live.staticflickr.com/65535/53771605076_a627b47079_n.jpg",
            "imagens": [
                "https://live.staticflickr.com/65535/53771605086_07e031df67_n.jpg",
                "https://live.staticflickr.com/65535/53772031420_2f05d2db58_n.jpg",
                "https://live.staticflickr.com/65535/53771814598_67d7222d78_n.jpg"
            ]
        }, 
        {
            "nome"        : "Apple HomePod mini",
            "descricao"   : "Alto-falante inteligente com assistente virtual Siri, design compacto e som de alta qualidade. Permite controlar dispositivos domésticos inteligentes, reproduzir música, obter informações e muito mais.",
            "cor"         : "Branco",
            "valor"       :  1099.00,
            "modelo"      : "HomePod mini",
            "peso"        :  0.345,
            "altura"      :  8.4,
            "comprimento" :  9.8,
            "largura"     :  9.8 ,
            "fabricante"  : "Apple",
            "fornecedor"  : "Apple Store",
            "subCategoria": "Assistente Virtual",
            "imagemPrincipal": "https://live.staticflickr.com/65535/53748961601_226978987d_b.jpg",
            "imagens": [
                "https://live.staticflickr.com/65535/53749373840_cb101bfc70_c.jpg",
                "https://live.staticflickr.com/65535/53748961611_7e5c97c726_b.jpg",
                "https://live.staticflickr.com/65535/53749373825_9d4566bdc7_b.jpg"
            ]
        },
        {
            "nome"        : "Google Nest Mini",
            "descricao"   : "Assistente virtual compacto com alto-falante integrado, controlado por voz, capaz de reproduzir música, responder perguntas, controlar dispositivos domésticos inteligentes e muito mais.",
            "cor"         : "Giz",
            "valor"       :  249.00,
            "modelo"      : "Nest Mini",
            "peso"        :  0.181,
            "altura"      :  0.42,
            "comprimento" :  9.8,
            "largura"     :  9.8,
            "fabricante"  : "Google",
            "fornecedor"  : "Google Store",
            "subCategoria": "Assistente Virtual",
            "imagemPrincipal": "https://live.staticflickr.com/65535/53748979766_2c650e5ce9_z.jpg",
            "imagens": [
                "https://live.staticflickr.com/65535/53749164903_712cecd525_z.jpg",
                "https://live.staticflickr.com/65535/53749164923_dd7054c188.jpg",
                "https://live.staticflickr.com/65535/53748057927_85990150eb_z.jpg"
            ]
        },
        {
          "nome"        : "Controle Remoto Smart Universal Pro",
          "descricao"   : "Este controle remoto inteligente é compatível com uma ampla gama de dispositivos eletrônicos, incluindo TVs, sistemas de som, ar-condicionado e dispositivos de automação residencial. Com um design ergonômico e integração com assistentes de voz, oferece controle conveniente e centralizado de todos os seus aparelhos",
          "cor"         : "Preto",
          "valor"       :  99.99,
          "modelo"      : "CR-SUP",
          "peso"        :  0.2,
          "altura"      :  2,
          "comprimento" :  18,
          "largura"     :  5,
          "fabricante"  : "SmartHome Innovations Inc",
          "fornecedor"  : "Universal Electronics Ltda",
          "subCategoria": "Controles Smarts",
          "imagemPrincipal": "https://live.staticflickr.com/65535/53748084282_5a364b939d_w.jpg",
          "imagens": [
              "https://live.staticflickr.com/65535/53749191683_cb3b0c2d9e_z.jpg",
              "https://live.staticflickr.com/65535/53749005846_c779fe27f1_z.jpg",
              "https://live.staticflickr.com/65535/53749420620_5267031f28_m.jpg"
          ]
        },
        {
            "nome"        : "Controle Remoto Inteligente HomeControl Max",
            "descricao"   : "Este controle remoto inteligente oferece controle total sobre todos os seus dispositivos domésticos. Compatível com TVs, sistemas de áudio, iluminação inteligente e mais, ele se conecta via Wi-Fi e Bluetooth, permitindo personalização e comandos de voz. Seu design intuitivo e tela touch facilitam a navegação e o uso.",
            "cor"         : "Cinza",
            "valor"       :  129.99,
            "modelo"      : "CR-HCMX",
            "peso"        :  0.25,
            "altura"      :  2.5,
            "comprimento" :  19,
            "largura"     :  6,
            "fabricante"  : "HomeTech Solutions Inc.",
            "fornecedor"  : "Smart Living Electronics Ltda",
            "subCategoria": "Controles Smarts",
            "imagemPrincipal": "https://live.staticflickr.com/65535/53749170753_b2ee1a3ab7_n.jpg",
            "imagens": [
                "https://live.staticflickr.com/65535/53749397345_27192d17b1_n.jpg",
                "https://live.staticflickr.com/65535/53749306024_6da70e4a67_w.jpg",
                "https://live.staticflickr.com/65535/53749170763_c947b2661d_n.jpg"
            ]
        },
        {
            "nome"        : "Controle Remoto Inteligente SmartMaster Elite",
            "descricao"   : " O controle remoto inteligente SmartMaster Elite oferece controle centralizado e intuitivo para todos os seus dispositivos eletrônicos, como TVs, sistemas de som, iluminação inteligente e mais. Com integração de assistentes de voz, tela sensível ao toque e conectividade Wi-Fi, proporciona uma experiência de uso prática e eficiente.",
            "cor"         : "Preto e Prata",
            "valor"       :  149.99,
            "modelo"      : "CR-SME",
            "peso"        :  0.22 ,
            "altura"      :  2.2 ,
            "comprimento" :  20,
            "largura"     :  5.5,
            "fabricante"  : "EliteTech Innovations Inc",
            "fornecedor"  : "Advanced Home Solutions Ltda",
            "subCategoria": "Controles Smarts",
            "imagemPrincipal": "https://live.staticflickr.com/65535/53749176033_4b473fc7ed_w.jpg",
            "imagens": [
                "https://live.staticflickr.com/65535/53749402640_67acd280f9_n.jpg",
                "https://live.staticflickr.com/65535/53749402635_94cf37d0fb_n.jpg",
                "https://live.staticflickr.com/65535/53748990706_4e63d742f6_n.jpg"
            ]
        },
        {
            "nome"        : "Controle Remoto Inteligente OmniControl Pro",
            "descricao"   : "O controle remoto inteligente OmniControl Pro oferece um controle abrangente para todos os seus dispositivos domésticos inteligentes. Com recursos de conectividade Wi-Fi e Bluetooth, integração com assistentes de voz, e uma interface de toque intuitiva, ele torna a gestão de seus aparelhos eletrônicos mais conveniente e eficiente.",
            "cor"         : "Preto",
            "valor"       :  139.99,
            "modelo"      : "CR-OCPro",
            "peso"        :  0.08,
            "altura"      :  2.1,
            "comprimento" :  18.5,
            "largura"     :  4.8,
            "fabricante"  : "OmniTech Innovations Inc.",
            "fornecedor"  : "Amazon Brasil",
            "subCategoria": "Controles Smarts",
            "imagemPrincipal": "https://live.staticflickr.com/65535/53749181243_8769d2f2f7_n.jpg",
            "imagens": [
                "https://live.staticflickr.com/65535/53748073962_a64d585a85_n.jpg",
                "https://live.staticflickr.com/65535/53749181238_f031d2f3f3_n.jpg",
                "https://live.staticflickr.com/65535/53749407945_9aeddeb83c_n.jpg"
            ]
        },
        {
            "nome"        : "Controle Remoto Inteligente UltimateControl X10",
            "descricao"   : " O controle remoto inteligente UltimateControl X10 oferece uma experiência de controle completa para sua casa conectada. Compatível com uma ampla variedade de dispositivos, incluindo TVs, sistemas de áudio, iluminação inteligente e aparelhos de climatização. Possui integração com assistentes de voz, conectividade Wi-Fi e uma tela sensível ao toque para fácil navegação.",
            "cor"         : "Preto",
            "valor"       :  159.99,
            "modelo"      : "CR-UCX10",
            "peso"        :  0.21,
            "altura"      :  23,
            "comprimento" :  19,
            "largura"     :  5,
            "fabricante"  : "UltimateTech Corp.",
            "fornecedor"  : "Home Automation Experts Ltda",
            "subCategoria": "Controles Smarts",
            "imagemPrincipal": "https://live.staticflickr.com/65535/53749425350_91351c8535_z.jpg",
            "imagens": [
                "https://live.staticflickr.com/65535/53749333504_2a238c6eb3_z.jpg",
                "https://live.staticflickr.com/65535/53748091662_1b8fdf8894_w.jpg",
                "https://live.staticflickr.com/65535/53748091657_bee4c36741_w.jpg"
            ]
        },
        {
          "nome"        : "Lâmpada Inteligente BrightLux Pro",
          "descricao"   : "A lâmpada inteligente BrightLux Pro oferece controle de iluminação avançado com a capacidade de ajustar a cor e a intensidade da luz via aplicativo móvel ou comandos de voz. Compatível com assistentes de voz, permite criar ambientes personalizados e programar horários de funcionamento para maior conveniência.",
          "cor"         : "Branca",
          "valor"       :  49.99,
          "modelo"      : "LI-BLP",
          "peso"        :  0.150,
          "altura"      :  12,
          "comprimento" :  6,
          "largura"     :  6,
          "fabricante"  : "BrightTech Lighting Inc.",
          "fornecedor"  : "Amazon Brasil",
          "subCategoria": "Lâmpadas Inteligentes",
          "desconto": "50",
          "imagemPrincipal": "https://live.staticflickr.com/65535/53748104852_9042172f78_w.jpg",
          "imagens": [
              "https://live.staticflickr.com/65535/53749439190_4b83e87852_w.jpg",
              "https://live.staticflickr.com/65535/53749025871_5049b5e9b5_w.jpg",
              "https://live.staticflickr.com/65535/53748104862_649b8f793e_w.jpg"
          ]
        },
        {
            "nome"        : "Lâmpada LED Inteligente Philips Hue",
            "descricao"   : "Lâmpada LED inteligente da linha Philips Hue, que se conecta ao hub Hue Bridge para permitir controle remoto via aplicativo Hue. Oferece opções avançadas de ajuste de cor, temperatura e programação de ambientes.",
            "cor"         : "Branco",
            "valor"       :  79.90,
            "modelo"      : "HueLight 3000",
            "peso"        :  0.12,
            "altura"      :  15,
            "comprimento" :  7,
            "largura"     :  7,
            "fabricante"  : "Philips",
            "fornecedor"  : "Pichau",
            "subCategoria": "Lâmpadas Inteligentes",
            "imagemPrincipal": "https://live.staticflickr.com/65535/53749443590_c40351d6d7_w.jpg",
            "imagens": [
                "https://live.staticflickr.com/65535/53749351199_58aeff3427_w.jpg",
                "https://live.staticflickr.com/65535/53749216118_b144e03b64_w.jpg",
                "https://live.staticflickr.com/65535/53749351194_27a8232bd8_w.jpg"
            ]
        },
        {
            "nome"        : "Lâmpada Inteligente LED RGBW",
            "descricao"   : "Lâmpada LED inteligente que oferece ajuste de cores RGBW e conectividade Bluetooth para controle por meio de aplicativo móvel. Permite criar ambientes personalizados e programação de horários.",
            "cor"         : "Branco",
            "valor"       :  59.90,
            "modelo"      : "SmartColor 1500",
            "peso"        :  0.1,
            "altura"      :  12,
            "comprimento" :  6,
            "largura"     :  6,
            "fabricante"  : "SmartHome Inc.",
            "fornecedor"  : "Cissa Magazine",
            "subCategoria": "Lâmpadas Inteligentes",
            "imagemPrincipal":  "https://live.staticflickr.com/65535/53749037576_d60fc38e5b_n.jpg",
            "imagens": [
                "https://live.staticflickr.com/65535/53748117202_c8cbfd3705_n.jpg",
                "https://live.staticflickr.com/65535/53749037581_559b5b6db9_w.jpg",
                "https://live.staticflickr.com/65535/53749358904_a170681667_w.jpg"
            ]
        },
        {
            "nome"        : "Lâmpada Inteligente Wi-Fi LED RGB",
            "descricao"   : "Lâmpada LED inteligente com conexão Wi-Fi, que pode ser controlada remotamente por meio de um aplicativo para smartphone. Permite ajuste de cor, intensidade luminosa e programação de horários de funcionamento.",
            "cor"         : "Branco",
            "valor"       :  49.90,
            "modelo"      : "SmartBulb 2000",
            "peso"        :  0.1,
            "altura"      :  12,
            "comprimento" :  6,
            "largura"     :  6,
            "fabricante"  : "SmartHome Inc.",
            "fornecedor"  : "Girafa",
            "subCategoria": "Lâmpadas Inteligentes",
            "imagemPrincipal": "https://live.staticflickr.com/65535/53765157110_a8a67cf48f_n.jpg",
            "imagens": [
                "https://live.staticflickr.com/65535/53765071929_0c08f48c60_n.jpg",
                "https://live.staticflickr.com/65535/53763835302_527404bcbd_n.jpg",
                "https://live.staticflickr.com/65535/53764937708_93b86fff75_n.jpg"
            ]
        },
        {
            "nome"        : "Lâmpada Inteligente ConnectLight 2000",
            "descricao"   : "Esta lâmpada inteligente oferece iluminação ajustável via aplicativo móvel, permitindo que você escolha entre uma variedade de cores e intensidades de luz para criar o ambiente perfeito em sua casa",
            "cor"         : "Branca",
            "valor"       :  29.99,
            "modelo"      : "LI-CL2000",
            "peso"        :  0.15,
            "altura"      :  12,
            "comprimento" :  6,
            "largura"     :  6,
            "fabricante"  : "IllumiTech Inc",
            "fornecedor"  : "Girafa",
            "subCategoria": "Lâmpadas Inteligentes",
            "imagemPrincipal": "https://live.staticflickr.com/65535/53765168200_049cd72e71_n.jpg",
            "imagens": [
                "https://live.staticflickr.com/65535/53764948573_81f2f0dce7_n.jpg",
                "https://live.staticflickr.com/65535/53764948588_935a664b0e_n.jpg",
                "https://live.staticflickr.com/65535/53764948623_947957a608_w.jpg"
            ]
        },
        {
          "nome"        : "Sensor de Movimento PIR HC-SR501",
          "descricao"   : "Sensor de movimento por infravermelho passivo (PIR) amplamente utilizado em projetos de automação residencial e segurança. Detecta movimentos de pessoas ou objetos em um ambiente e pode ser integrado a sistemas de alarme ou iluminação automatizada.",
          "cor"         : "Branco",
          "valor"       :  15.90,
          "modelo"      : "HC-SR501",
          "peso"        :  10,
          "altura"      :  3,
          "comprimento" :  3,
          "largura"     :  2,
          "fabricante"  : "Generic",
          "fornecedor"  : "Loja de Componentes",
          "subCategoria": "Sensores",
          "imagemPrincipal": "https://live.staticflickr.com/65535/53765093564_19e2f7f5b3_n.jpg",
          "imagens": [
              "https://live.staticflickr.com/65535/53764765616_21cffcb500_z.jpg",
              "https://live.staticflickr.com/65535/53765093569_673a1cf98c_n.jpg",
              "https://live.staticflickr.com/65535/53763857002_449003c6b6_n.jpg"
          ]
        },
        {
          "nome"        : "Sensor de Umidade e Temperatura DHT22",
          "descricao"   : "Sensor digital de umidade e temperatura com alta precisão e resposta rápida. É amplamente utilizado em projetos de monitoramento ambiental, controle de climatização e automação residencial.",
          "cor"         : "Azul",
          "valor"       :  22.50,
          "modelo"      : "DHT22",
          "peso"        :  0.004,
          "altura"      :  1.5,
          "comprimento" :  4,
          "largura"     :  1.5,
          "fabricante"  : "Adafruit",
          "fornecedor"  : "Kabum",
          "subCategoria": "Sensores",
          "imagemPrincipal": "https://live.staticflickr.com/65535/53764976423_997b91069e_n.jpg",
          "imagens": [
              "https://live.staticflickr.com/65535/53764976433_2a1522c90d_n.jpg",
              "https://live.staticflickr.com/65535/53764976443_ae94762afb_n.jpg",
              "https://live.staticflickr.com/65535/53765195470_933cc0923a_n.jpg"
          ]
        },
        {
          "nome"        : "Sensor de Luz LDR 5mm",
          "descricao"   : "Sensor de luz de resistência dependente de luz (LDR) utilizado para detectar a presença ou ausência de luz em um ambiente. Pode ser empregado em projetos de automação residencial, controle de iluminação e sistemas de segurança.",
          "cor"         : "Preto",
          "valor"       :  2.50,
          "modelo"      : "LDR 5mm",
          "peso"        :  0.001,
          "altura"      :  0.5,
          "comprimento" :  0.5,
          "largura"     :  0.5,
          "fabricante"  : "Generic",
          "fornecedor"  : "Eletro Shopping",
          "subCategoria": "Sensores",
          "imagemPrincipal": "https://live.staticflickr.com/65535/53764985688_80bbca75ae_m.jpg",
          "imagens": [
              "https://live.staticflickr.com/65535/53765204135_753583f065_n.jpg",
              "https://live.staticflickr.com/65535/53763883642_7fc4d151e0_m.jpg",
              "https://live.staticflickr.com/65535/53763883682_13d867fed4_m.jpg"
          ]
        },
        {
          "nome"        : "Sensor de Proximidade Ultrassônico HC-SR04",
          "descricao"   : "Sensor de proximidade ultrassônico que mede a distância entre o sensor e um objeto através do cálculo do tempo de ida e volta de ondas sonoras ultrassônicas. Amplamente utilizado em projetos de robótica, detecção de obstáculos e estacionamento automático.",
          "cor"         : "Azul",
          "valor"       :  8.90,
          "modelo"      : "HC-SR04",
          "peso"        :  0.003,
          "altura"      :  2,
          "comprimento" :  4,
          "largura"     :  1.5,
          "fabricante"  : "Generic",
          "fornecedor"  : "Mega Mamute",
          "subCategoria": "Sensores",
          "imagemPrincipal": "https://live.staticflickr.com/65535/53764894981_6057c89d0a_m.jpg",
          "imagens": [
              "https://live.staticflickr.com/65535/53765306835_af69ea0015_m.jpg",
              "https://live.staticflickr.com/65535/53765222129_5eb197173e_m.jpg",
              "https://live.staticflickr.com/65535/53765306830_dfc6c19d1f_n.jpg"
          ]
        },
        {
          "nome"        : "Sensor de Gás MQ-2",
          "descricao"   : "Sensor de gás que detecta a presença de vários tipos de gases inflamáveis e fumaça em um ambiente. Pode ser utilizado em sistemas de monitoramento de qualidade do ar, detecção de vazamentos de gás e alarmes de incêndio.",
          "cor"         : "Vermelho",
          "valor"       :  12.00,
          "modelo"      : "MQ-2",
          "peso"        :  0.005,
          "altura"      :  2,
          "comprimento" :  2,
          "largura"     :  2,
          "fabricante"  : "Generic",
          "fornecedor"  : "Balão da Informática",
          "subCategoria": "Sensores",
          "imagemPrincipal": "https://live.staticflickr.com/65535/53764901406_32f5bab085_m.jpg",
          "imagens": [
              "https://live.staticflickr.com/65535/53763991262_be52c1a9e2_m.jpg",
              "https://live.staticflickr.com/65535/53765094038_93145b17c2_m.jpg",
              "https://live.staticflickr.com/65535/53763991252_1e427edb9d_m.jpg"
          ]
        },
        {
          "nome"        : "Alienware Aurora R15",
          "descricao"   : "Desempenho de alto nível com processador AMD Ryzen 9 e placa de vídeo NVIDIA GeForce RTX 3080, ideal para jogos intensivos.",
          "cor"         : "Preto",
          "valor"       :  18000.00,
          "modelo"      : "Aurora R15",
          "peso"        :  17.8,
          "altura"      :  48.1,
          "comprimento" :  43.2,
          "largura"     :  22.2,
          "fabricante"  : "Dell",
          "fornecedor"  : "Dell",
          "subCategoria": "Computadores Gamers",
          "imagemPrincipal": "https://live.staticflickr.com/65535/53765515115_40571879af_n.jpg",
          "imagens": [
              "https://live.staticflickr.com/65535/53764193492_046eef16f6_n.jpg",
              "https://live.staticflickr.com/65535/53765515100_8b35981843_n.jpg",
              "https://live.staticflickr.com/65535/53764193497_31b3780c07_n.jpg"
          ]
        },
        {
          "nome"        : "HP Omen 30L",
          "descricao"   : "Computador gamer com processador Intel Core i9 e placa de vídeo NVIDIA GeForce RTX 3090, oferecendo excelente desempenho e refrigeração avançada.",
          "cor"         : "Preto",
          "valor"       :  20500.00,
          "modelo"      : "Omen 30L",
          "peso"        :  12.5,
          "altura"      :  44.8,
          "comprimento" :  42.2,
          "largura"     :  19.2,
          "fabricante"  : "HP",
          "fornecedor"  : "HP",
          "subCategoria": "Computadores Gamers",
          "imagemPrincipal": "https://live.staticflickr.com/65535/53765444549_cf2c6fb48c_n.jpg",
          "imagens": [
              "https://live.staticflickr.com/65535/53765444544_50edb8e848_z.jpg",
              "https://live.staticflickr.com/65535/53764207002_29af1f6fa1_w.jpg",
              "https://live.staticflickr.com/65535/53765310903_e9dd220d17_w.jpg"
          ]
        },
        {
          "nome"        : "Acer Predator Orion 3000",
          "descricao"   : "Compacto e poderoso, com processador Intel Core i7 e placa de vídeo NVIDIA GeForce RTX 3060, perfeito para gamers e streamers.",
          "cor"         : "Preto",
          "valor"       :  12000.00,
          "modelo"      : "Predator Orion 3000",
          "peso"        :  10,
          "altura"      :  39.2,
          "comprimento" :  35,
          "largura"     :  17.5,
          "fabricante"  : "Acer",
          "fornecedor"  : "Acer",
          "subCategoria": "Computadores Gamers",
          "imagemPrincipal": "https://live.staticflickr.com/65535/53764213057_c5aab58c24_n.jpg",
          "imagens": [
              "https://live.staticflickr.com/65535/53765123831_503cbd9d9f_n.jpg",
              "https://live.staticflickr.com/65535/53765534595_216a5281ef_n.jpg",
              "https://live.staticflickr.com/65535/53764213067_d7fdd6ba69_m.jpg"
          ]
        },
        {
          "nome"        : "Lenovo Legion T7",
          "descricao"   : "Equipado com processador Intel Core i7 e placa de vídeo NVIDIA GeForce RTX 3070, oferecendo excelente desempenho e design elegante.",
          "cor"         : "Cinza",
          "valor"       :  16000.00,
          "modelo"      : "Legion T7",
          "peso"        :  14.5,
          "altura"      :  45.5,
          "comprimento" :  38.5,
          "largura"     :  20.5,
          "fabricante"  : "Lenovo",
          "fornecedor"  : "Lenovo",
          "subCategoria": "Computadores Gamers",
          "imagemPrincipal": "https://live.staticflickr.com/65535/53765323728_92989e50bd_n.jpg",
          "imagens": [
              "https://live.staticflickr.com/65535/53764219572_226695e01d_n.jpg",
              "https://live.staticflickr.com/65535/53765457034_80c3d7478a_n.jpg",
              "https://live.staticflickr.com/65535/53765323743_9d99f1123b_n.jpg"
          ]
        },
        {
          "nome"        : "MSI Trident 3",
          "descricao"   : "Ultra compacto com processador Intel Core i5 e placa de vídeo NVIDIA GeForce GTX 1660 Super, ideal para jogos em alta definição.",
          "cor"         : "Preto",
          "valor"       :  9500.00,
          "modelo"      : "Trident 3",
          "peso"        :  6.5,
          "altura"      :  34.6,
          "comprimento" :  38.3,
          "largura"     :  9.7,
          "fabricante"  : "MSI",
          "fornecedor"  : "MSI Brasil",
          "subCategoria": "Computadores Gamers",
          "imagemPrincipal": "https://live.staticflickr.com/65535/53765554650_257916e6e1_m.jpg",
          "imagens": [
              "https://live.staticflickr.com/65535/53764233382_bc8ba7de50_m.jpg",
              "https://live.staticflickr.com/65535/53765337398_3ce2e0e47e_m.jpg",
              "https://live.staticflickr.com/65535/53765470609_056efcc476_n.jpg"
          ]
        },
        {
          "nome"        : "Dell Precision 7920",
          "descricao"   : "Workstation de alto desempenho com processador Intel Xeon e placa de vídeo NVIDIA Quadro RTX 5000, ideal para renderização e simulações complexas.",
          "cor"         : "Preto",
          "valor"       :  30000.00,
          "modelo"      : "Precision 7920",
          "peso"        :  23,
          "altura"      :  41.7,
          "comprimento" :  56.6,
          "largura"     :  21.8,
          "fabricante"  : "Dell",
          "fornecedor"  : "Dell",
          "subCategoria": "Computadores Workstation",
          "imagemPrincipal": "https://live.staticflickr.com/65535/53765151891_8f20fb2cb2_m.jpg",
          "imagens": [
              "https://live.staticflickr.com/65535/53765344858_0b1ac59688_n.jpg",
              "https://live.staticflickr.com/65535/53765151886_6eea8d347e_m.jpg",
              "https://live.staticflickr.com/65535/53765151881_dded0f43e9_m.jpg"
          ]
      },
      {
          "nome"        : "HP Z8 G4",
          "descricao"   : "Máxima performance com processador dual Intel Xeon e placa de vídeo NVIDIA Quadro RTX 6000, projetada para cargas de trabalho intensivas e modelagem 3D.",
          "cor"         : "Preto",
          "valor"       :  35000.00,
          "modelo"      : "Z8 G4",
          "peso"        :  22,
          "altura"      :  44.4,
          "comprimento" :  54.8,
          "largura"     :  20.3,
          "fabricante"  : "HP",
          "fornecedor"  : "HP",
          "subCategoria": "Computadores Workstation",
          "imagemPrincipal": "https://live.staticflickr.com/65535/53764248342_b1698769d7_m.jpg",
          "imagens": [
              "https://live.staticflickr.com/65535/53765569405_c5b0d8a328_m.jpg",
              "https://live.staticflickr.com/65535/53765485649_dcf579309f_m.jpg",
              "https://live.staticflickr.com/65535/53765569395_0911bc2aaa_m.jpg"
          ]
      },
      {
          "nome"        : "Lenovo ThinkStation P920",
          "descricao"   : "Desempenho extremo com processador Intel Xeon e placa de vídeo NVIDIA Quadro RTX 4000, ideal para renderização gráfica e computação científica.",
          "cor"         : "Preto",
          "valor"       :  28000.00,
          "modelo"      : "ThinkStation P920",
          "peso"        :  24,
          "altura"      :  44,
          "comprimento" :  62,
          "largura"     :  20,
          "fabricante"  : "Lenovo",
          "fornecedor"  : "Lenovo",
          "subCategoria": "Computadores Workstation",
          "imagemPrincipal": "https://live.staticflickr.com/65535/53765488534_b0b7e95ff0_m.jpg",
          "imagens": [
              "https://live.staticflickr.com/65535/53765355088_a09a32b55a_m.jpg",
              "https://live.staticflickr.com/65535/53765162516_9bb8bd6b57_m.jpg",
              "https://live.staticflickr.com/65535/53765488529_398093e5bc_m.jpg"
          ]
      },
      {
          "nome"        : "Apple Mac Pro",
          "descricao"   : "Workstation poderosa com processador Intel Xeon W e placa de vídeo AMD Radeon Pro Vega II Duo, ideal para edição de vídeo e desenvolvimento de software.",
          "cor"         : "Prata",
          "valor"       :  50000.00,
          "modelo"      : "Mac Pro",
          "peso"        :  18,
          "altura"      :  52.9,
          "comprimento" :  45,
          "largura"     :  21.6,
          "fabricante"  : "Apple",
          "fornecedor"  : "Apple Brasil",
          "subCategoria": "Computadores Workstation",
          "imagemPrincipal": "https://live.staticflickr.com/65535/53764254357_5854e03d0f_m.jpg",
          "imagens": [
              "https://live.staticflickr.com/65535/53765575495_1affc81027_m.jpg",
              "https://live.staticflickr.com/65535/53765575480_e0fb6bd9b0_n.jpg",
              "https://live.staticflickr.com/65535/53764254362_b971f1d121_m.jpg"
          ]
      },
      {
          "nome"        : "MSI Creator P100X",
          "descricao"   : "Design compacto com desempenho excepcional, equipado com processador Intel Core i9 e placa de vídeo NVIDIA GeForce RTX 2080 Super, ideal para criadores de conteúdo e designers gráficos.",
          "cor"         : "Branco",
          "valor"       :  22000.00,
          "modelo"      : "Creator P100X",
          "peso"        :  10,
          "altura"      :  37.2,
          "comprimento" :  40.8,
          "largura"     :  13.1,
          "fabricante"  : "MSI",
          "fornecedor"  : "MSI Brasil",
          "subCategoria": "Computadores Workstation",
          "imagemPrincipal": "https://live.staticflickr.com/65535/53765579435_796530f09a_w.jpg",
          "imagens": [
              "https://live.staticflickr.com/65535/53765169666_7d646039a7_n.jpg",
              "https://live.staticflickr.com/65535/53765169671_fcd0d421bc_z.jpg",
              "https://live.staticflickr.com/65535/53765362358_699092d094_m.jpg"
          ]
      },
      {
        "nome"        : "Controle DualSense",
        "descricao"   : "Controle sem fio para PlayStation 5 com feedback háptico avançado e gatilhos adaptáveis, proporcionando uma experiência de jogo imersiva.",
        "cor"         : "Branco",
        "valor"       :  500.00,
        "modelo"      : "CFI-ZCT1W",
        "peso"        :  0.28,
        "altura"      :  7,
        "comprimento" :  16,
        "largura"     :  6.6,
        "fabricante"  : "Sony",
        "fornecedor"  : "Sony Brasil",
        "subCategoria": "Acessórios de Console",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765498719_769e165405_n.jpg",
        "imagens": [
            "https://live.staticflickr.com/65535/53765365113_1a6a1bf861.jpg",
            "https://live.staticflickr.com/65535/53765172546_695b36d3c9_z.jpg",
            "https://live.staticflickr.com/65535/53765498729_f905b41c36_z.jpg"
        ]
      },
      
      {
        "nome"        : "Xbox Wireless Controller",
        "descricao"   : "Controle sem fio para Xbox Series X|S com design moderno, superfície texturizada e tecnologia de mapeamento personalizado de botões.",
        "cor"         : "Preto",
        "valor"       :  450.00,
        "modelo"      : "QAT-00001",
        "peso"        :  0.25,
        "altura"      :  7,
        "comprimento" :  15.3,
        "largura"     :  6.1,
        "fabricante"  : "Microsoft",
        "fornecedor"  : "Microsoft Brasil",
        "subCategoria": "Acessórios de Console",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765179551_1f23f854dd_w.jpg",
        "imagens": [
            "https://live.staticflickr.com/65535/53765589580_875a39d112_n.jpg",
            "https://live.staticflickr.com/65535/53765175676_a9ccbbda12.jpg",
            "https://live.staticflickr.com/65535/53765501744_626f85954f.jpg"
        ]
      },
      
      {
        "nome"        : "Fone de Ouvido Pulse 3D",
        "descricao"   : "Headset sem fio para PlayStation 5 com som 3D e dois microfones com cancelamento de ruído, ideal para comunicação clara em jogos.",
        "cor"         : "Branco",
        "valor"       :  600.00,
        "modelo"      : "CFI-ZWH1",
        "peso"        :  0.295,
        "altura"      :  20,
        "comprimento" :  19,
        "largura"     :  9.1,
        "fabricante"  : "Sony",
        "fornecedor"  : "Sony Brasil",
        "subCategoria": "Acessórios de Console",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765508814_30a8ed4f5a_w.jpg",
        "imagens": [
            "https://live.staticflickr.com/65535/53765183106_12dfdca4c5_w.jpg",
            "https://live.staticflickr.com/65535/53765375868_f3f321f894_m.jpg",
            "https://live.staticflickr.com/65535/53765183101_fa465b2d08_m.jpg"
        ]
      },
      
      {
        "nome"        : "Nintendo Switch Pro Controller",
        "descricao"   : "Controle sem fio ergonômico para Nintendo Switch com botões grandes e confortáveis, proporcionando longa duração da bateria e compatibilidade com amiibo.",
        "cor"         : "Preto",
        "valor"       :  400.00,
        "modelo"      : "HAC-013",
        "peso"        :  0.246,
        "altura"      :  10.6,
        "comprimento" :  15.2,
        "largura"     :  6,
        "fabricante"  : "Nintendo",
        "fornecedor"  : "Nintendo Brasil",
        "subCategoria": "Acessórios de Console",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765595550_2d872032bb_w.jpg",
        "imagens": [
            "https://live.staticflickr.com/65535/53765595535_232826ecda_n.jpg",
            "https://live.staticflickr.com/65535/53764275132_1067ff344b_z.jpg",
            "https://live.staticflickr.com/65535/53765378753_72f9060ec4_m.jpg"
        ]
      },
      
      {
        "nome"        : "Carregador DualSense Charging Station",
        "descricao"   : "Estação de carregamento para dois controles DualSense, permitindo carregar rapidamente e manter a organização do setup.",
        "cor"         : "Branco",
        "valor"       :  200.00,
        "modelo"      : "CFI-ZDS1",
        "peso"        :  0.320,
        "altura"      :  5.5,
        "comprimento" :  15,
        "largura"     :  5.5,
        "fabricante"  : "Sony",
        "fornecedor"  : "Sony Brasil",
        "subCategoria": "Acessórios de Console",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53764278457_dec40f8b65_w.jpg",
        "imagens": [
            "https://live.staticflickr.com/65535/53765598905_e618049ea1_n.jpg",
            "https://live.staticflickr.com/65535/53764278472_0bf36a90a8_n.jpg",
            "https://live.staticflickr.com/65535/53765517739_32c8c03ace_n.jpg"
        ]
      },
      {
        "nome"        : "Carregador Rápido Samsung 25W",
        "descricao"   : "Carregador rápido de 25W compatível com smartphones e tablets Samsung, oferecendo carregamento eficiente e seguro.",
        "cor"         : "Branco",
        "valor"       :  150.00,
        "modelo"      : "EP-TA800",
        "peso"        :  0.05,
        "altura"      :  4,
        "comprimento" :  7.8,
        "largura"     :  2.6,
        "fabricante"  : "Samsung",
        "fornecedor"  : "Samsung Brasil",
        "subCategoria": "Carregadores",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53764286637_48278de44f_n.jpg",
        "imagens": [
            "https://live.staticflickr.com/65535/53765607125_366d1f2fae_m.jpg",
            "https://live.staticflickr.com/65535/53765196766_4582181b5a_m.jpg",
            "https://live.staticflickr.com/65535/53765607135_e9a03b469c_m.jpg"
        ]
      },
      
      {
        "nome"        : "Carregador Apple MagSafe",
        "descricao"   : "Carregador sem fio MagSafe para iPhone, oferecendo alinhamento magnético perfeito e carregamento rápido de até 15W.",
        "cor"         : "Branco",
        "valor"       :  350.00,
        "modelo"      : "A2140",
        "peso"        :  0.045,
        "altura"      :  0.9,
        "comprimento" :  7.8,
        "largura"     :  7.8,
        "fabricante"  : "Apple",
        "fornecedor"  : "Apple Brasil",
        "subCategoria": "Carregadores",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53764290597_ef9a10d480_n.jpg",
        "imagens": [
            "https://live.staticflickr.com/65535/53765393948_6a209d6a99.jpg",
            "https://live.staticflickr.com/65535/53765393938_8277258988_n.jpg",
            "https://live.staticflickr.com/65535/53765393943_a73633ed70_n.jpg"
        ]
      },
      
      {
        "nome"        : "Carregador Turbo Power Motorola 20W",
        "descricao"   : "Carregador turbo de 20W com tecnologia Qualcomm Quick Charge 3.0, compatível com smartphones Motorola e outros dispositivos USB-C.",
        "cor"         : "Preto",
        "valor"       :  120.00,
        "modelo"      : "SC-20",
        "peso"        :  0.06,
        "altura"      :  4.2,
        "comprimento" :  8,
        "largura"     :  2.8,
        "fabricante"  : "Motorola",
        "fornecedor"  : "Motorola Brasil",
        "subCategoria": "Carregadores",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765529904_6888f0a3e9_w.jpg",
        "imagens": [
            "https://live.staticflickr.com/65535/53765396903_0cc1cda897_n.jpg",
            "https://live.staticflickr.com/65535/53765396908_0986cf9e1a_n.jpg",
            "https://live.staticflickr.com/65535/53764293867_764fd55326_n.jpg"
        ]
      },
      
      {
        "nome"        : "Carregador Rápido Anker PowerPort+ 1",
        "descricao"   : "Carregador rápido de 24W com tecnologia PowerIQ e compatível com dispositivos USB-C e USB-A, garantindo carregamento eficiente e seguro.",
        "cor"         : "Preto",
        "valor"       :  130.00,
        "modelo"      : "A2013",
        "peso"        :  0.055,
        "altura"      :  4.5,
        "comprimento" :  8.5,
        "largura"     :  2.7,
        "fabricante"  : "Anker",
        "fornecedor"  : "Anker Brasil",
        "subCategoria": "Carregadores",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765619545_bff52daf6d_w.jpg",
        "imagens": [
            "https://live.staticflickr.com/65535/53765534604_c9b586d77d_w.jpg",
            "https://live.staticflickr.com/65535/53765619540_c109d48fda_n.jpg",
            "https://live.staticflickr.com/65535/53765401663_dd6435cc8e_n.jpg"
        ]
      },
      
      {
        "nome"        : "Base de Carregamento Wireless Xiaomi",
        "descricao"   : "Base de carregamento sem fio de 10W compatível com smartphones e dispositivos com tecnologia Qi, oferecendo carregamento rápido e conveniente.",
        "cor"         : "Preto",
        "valor"       :  110.00,
        "modelo"      : "WPC01ZM",
        "peso"        :  0.04,
        "altura"      :  1.2,
        "comprimento" :  9,
        "largura"     :  9,
        "fabricante"  : "Xiaomi",
        "fornecedor"  : "Xiaomi Brasil",
        "subCategoria": "Carregadores",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765405723_1d38a43324_m.jpg",
        "imagens": [
            "https://live.staticflickr.com/65535/53765212651_c693bee825_n.jpg",
            "https://live.staticflickr.com/65535/53765212666_f42c98b650_m.jpg",
            "https://live.staticflickr.com/65535/53765212671_6b5b15f857_m.jpg"
        ]
      },
      {
        "nome"        : "Cooler Master Hyper 212 RGB Black Edition",
        "descricao"   : "Ventilador de CPU com design elegante, eficiente dissipação de calor e iluminação RGB personalizável. Oferece compatibilidade com uma variedade de soquetes de CPU e é ideal para overclocking moderado.",
        "cor"         : "Preto",
        "valor"       :  399.00 ,
        "modelo"      : "Hyper 212 RGB",
        "peso"        :  0.72,
        "altura"      :  15.9,
        "comprimento" :  8,
        "largura"     :  12,
        "fabricante"  : "Cooler Master",
        "fornecedor"  : "Amazon Brasil",
        "subCategoria": "Refrigeração",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765410513_d3fb779eb8_n.jpg",
        "imagens": [
            "https://live.staticflickr.com/65535/53764307642_4fd01d6ea3_n.jpg",
            "https://live.staticflickr.com/65535/53765628575_1e8ea2b61b_n.jpg",
            "https://live.staticflickr.com/65535/53765544114_9a1bef1302_n.jpg"
        ]
      },
      
      {
        "nome"        : "Corsair Hydro Series H100i RGB Platinum SE",
        "descricao"   : "Sistema de resfriamento líquido para CPU com radiador de 240 mm, duas ventoinhas PWM de 120 mm e iluminação RGB vibrante. Oferece desempenho excepcional de resfriamento e é compatível com várias plataformas de CPU.",
        "cor"         : "Branco",
        "valor"       :  799.00 ,
        "modelo"      : "H100i RGB Platinum SE",
        "peso"        :  1.8,
        "altura"      :  27.7,
        "comprimento" :  12.5,
        "largura"     :  3,
        "fabricante"  : "Corsair",
        "fornecedor"  : "Pichau",
        "subCategoria": "Refrigeração",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765548874_f7b4f98632_n.jpg",
        "imagens": [
            "https://live.staticflickr.com/65535/53765222101_b0da6881a5_z.jpg",
            "https://live.staticflickr.com/65535/53764312952_f33972e927_w.jpg",
            "https://live.staticflickr.com/65535/53765415683_f649baccfd_n.jpg"
        ]
      },
      
      {
        "nome"        : "NZXT Kraken X63",
        "descricao"   : "Sistema de resfriamento líquido all-in-one para CPU com radiador de 280 mm, bomba de LED RGB infinito e ventoinhas Aer P de alta performance. Oferece controle avançado de software e compatibilidade com processadores modernos.",
        "cor"         : "Preto",
        "valor"       :  899.00 ,
        "modelo"      : "Kraken X63",
        "peso"        :  1.29,
        "altura"      :  31.5,
        "comprimento" :  14,
        "largura"     :  33,
        "fabricante"  : "NZXT",
        "fornecedor"  : "Amazon Brasil",
        "subCategoria": "Refrigeração",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765560024_7f22ca6a81_z.jpg",
        "imagens": [
            "https://live.staticflickr.com/65535/53765560019_88ee28ab78_z.jpg",
            "https://live.staticflickr.com/65535/53765560014_8ca6164f99_z.jpg",
            "https://live.staticflickr.com/65535/53764323972_c33836b1e5_z.jpg"
        ]
      },
      
      {
        "nome"        : "Arctic Liquid Freezer II 280",
        "descricao"   : "Sistema de resfriamento líquido de alto desempenho com radiador de 280 mm, ventoinhas PWM de alta pressão estática e bomba de dissipação térmica silenciosa. Oferece montagem fácil e suporte para uma ampla gama de sockets de CPU.",
        "cor"         : "Preto",
        "valor"       :  699.00,
        "modelo"      : "Liquid Freezer II 280",
        "peso"        :  1.63,
        "altura"      :  31.5,
        "comprimento" :  14,
        "largura"     :  2.7,
        "fabricante"  : "Arctic",
        "fornecedor"  : "Kabum",
        "subCategoria": "Refrigeração",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765238941_b4349b754f_n.jpg",
        "imagens": [
            "https://live.staticflickr.com/65535/53765238941_b4349b754f_n.jpg",
            "https://live.staticflickr.com/65535/53765565974_c07c50546e_n.jpg",
            "https://live.staticflickr.com/65535/53765649960_81bbc396fd_n.jpg"
        ]
      },
      
      {
        "nome"        : "Noctua NH-D15",
        "descricao"   : "Ventilador de CPU de alta qualidade, equipado com duas ventoinhas NF-A15 PWM de 140 mm e radiador duplo para resfriamento excepcional. Oferece design silencioso e eficiente, ideal para sistemas de alto desempenho.",
        "cor"         : "Marrom",
        "valor"       :  899.00 ,
        "modelo"      : "NH-D15",
        "peso"        :  1.32,
        "altura"      :  16.5 ,
        "comprimento" :  15.5,
        "largura"     :  16.5 ,
        "fabricante"  : "Noctua",
        "fornecedor"  : "Loja de Componentes",
        "subCategoria": "Refrigeração",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765569829_35799a77ae_w.jpg",
        "imagens": [
            "https://live.staticflickr.com/65535/53765653975_a01a211045_w.jpg",
            "https://live.staticflickr.com/65535/53764333742_10c5b08690_z.jpg",
            "https://live.staticflickr.com/65535/53765653950_261ef4a15e_z.jpg"
        ]
      },
      {
        "nome"        : "Xiaomi Mi Box S",
        "descricao"   : "Smart Box 4K Ultra HD com sistema Android TV, controle remoto com comando de voz Google Assistente, e suporte a Chromecast.",
        "cor"         : "Preto",
        "valor"       :  450.00,
        "modelo"      : "MDZ-22-AB",
        "peso"        :  0.147,
        "altura"      :  1.67,
        "comprimento" :  9.525,
        "largura"     :  9.525,
        "fabricante"  : "Xiaomi",
        "fornecedor"  : "Xiaomi Brasil",
        "subCategoria": "Smart Box",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765246451_0e2085dc47_z.jpg",
        "imagens": [
            "https://live.staticflickr.com/65535/53764337157_588be88bc5_m.jpg",
            "https://live.staticflickr.com/65535/53764337162_526e9428cc_n.jpg",
            "https://live.staticflickr.com/65535/53764337167_f72f44d2dc_z.jpg"
        ]
      },
      
      {
        "nome"        : "Amazon Fire TV Stick 4K",
        "descricao"   : "Dispositivo de streaming com suporte a 4K Ultra HD, Dolby Vision, HDR, e controle remoto com Alexa.",
        "cor"         : "Preto",
        "valor"       :  380.00,
        "modelo"      : "E9L29Y",
        "peso"        :  0.53,
        "altura"      :  1.26,
        "comprimento" :  9.9,
        "largura"     :  3,
        "fabricante"  : "Amazon",
        "fornecedor"  : "Amazon Brasil",
        "subCategoria": "Smart Box",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765579154_7abfa1c62b_w.jpg",
        "imagens": [
            "https://live.staticflickr.com/65535/53765663050_367c4a8417_w.jpg",
            "https://live.staticflickr.com/65535/53765663060_cd0db2456e_n.jpg",
            "https://live.staticflickr.com/65535/53764342407_77f038e435_n.jpg"
        ]
      },
      
      {
        "nome"        : "Apple TV 4K",
        "descricao"   : "Smart Box com suporte a 4K HDR, Dolby Atmos, e integração completa com o ecossistema Apple.",
        "cor"         : "Preto",
        "valor"       :  1200.00,
        "modelo"      : "A1842",
        "peso"        :  0.425,
        "altura"      :  3.5,
        "comprimento" :  9.8,
        "largura"     :  9.8,
        "fabricante"  : "Apple",
        "fornecedor"  : "Apple Brasil",
        "subCategoria": "Smart Box",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765666220_000386c56d.jpg",
        "imagens": [
            "https://live.staticflickr.com/65535/53765581999_de7c95bd15_n.jpg",
            "https://live.staticflickr.com/65535/53765448608_5b19ee5774_n.jpg",
            "https://live.staticflickr.com/65535/53765581979_4181e75ae7_n.jpg"
        ]
      },
      
      {
        "nome"        : "Roku Express",
        "descricao"   : "Smart Box com interface simples e intuitiva, suporte a streaming em Full HD, e controle remoto fácil de usar.",
        "cor"         : "Preto",
        "valor"       :  250.00,
        "modelo"      : "3930BR",
        "peso"        :  0.032,
        "altura"      :  1.83,
        "comprimento" :  8.38,
        "largura"     :  3.81,
        "fabricante"  : "Roku",
        "fornecedor"  : "Roku Brasil",
        "subCategoria": "Smart Box",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765669395_af493cf4ea_n.jpg",
        "imagens": [
            "https://live.staticflickr.com/65535/53765258226_463e5b9dac_w.jpg",
            "https://live.staticflickr.com/65535/53765258201_bb9202c30d_n.jpg",
            "https://live.staticflickr.com/65535/53765585174_26133ee10a_n.jpg"
        ]
      },
      
      {
        "nome"        : "Google Chromecast com Google TV",
        "descricao"   : "Dispositivo de streaming com suporte a 4K HDR, controle remoto com Google Assistente, e integração com o Google TV.",
        "cor"         : "Branco",
        "valor"       :  400.00,
        "modelo"      : "GA01919-US",
        "peso"        :  0.055,
        "altura"      :  1.3,
        "comprimento" :  16.2,
        "largura"     :  6.1,
        "fabricante"  : "Google",
        "fornecedor"  : "Google Store",
        "subCategoria": "Smart Box",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765264196_43051e60dc_w.jpg",
        "imagens": [
            "https://live.staticflickr.com/65535/53765457333_9c57ec282c_w.jpg",
            "https://live.staticflickr.com/65535/53764354142_e7d8bb9556_w.jpg",
            "https://live.staticflickr.com/65535/53765264216_1eaafd95df.jpg"
        ]
      },
      {
        "nome"        : "Cooler Master Hyper 212 EVO",
        "descricao"   : "Cooler para CPU com tecnologia de contato contínuo, ventoinha de 120 mm e design de torre para melhor dissipação de calor.",
        "cor"         : "Preto e Prata",
        "valor"       :  250.00,
        "modelo"      : "RR-212E-20PK-R2",
        "peso"        :  0.58,
        "altura"      :  16,
        "comprimento" :  12,
        "largura"     :  7.97,
        "fabricante"  : "Cooler Master",
        "fornecedor"  : "Cooler Master Brasil",
        "subCategoria": "Coolers",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765466613_91d5d29199_n.jpg",
        "imagens": [
            "https://live.staticflickr.com/65535/53764363612_a6fc21ae25_n.jpg",
            "https://live.staticflickr.com/65535/53764363617_b1a46466e7.jpg",
            "https://live.staticflickr.com/65535/53765600264_573f3bd523.jpg"
        ]
      },
      
      {
        "nome"        : "Noctua NH-D15",
        "descricao"   : "Cooler de alto desempenho com design de torre dupla e duas ventoinhas NF-A15 de 140 mm para refrigeração silenciosa e eficiente.",
        "cor"         : "Marrom e Bege",
        "valor"       :  600.00,
        "modelo"      : "NH-D15",
        "peso"        :  1.32,
        "altura"      :  16.5,
        "comprimento" :  15,
        "largura"     :  13.5,
        "fabricante"  : "Noctua",
        "fornecedor"  : "Noctua Brasil",
        "subCategoria": "Coolers",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765473563_3995462637_n.jpg",
        "imagens": [
            "https://live.staticflickr.com/65535/53765280556_fbbe1c59b5_n.jpg",
            "https://live.staticflickr.com/65535/53765280581_13f9f151ee_z.jpg",
            "https://live.staticflickr.com/65535/53765280571_8fddba73e3_z.jpg"
        ]
      },
      
      {
        "nome"        : "Corsair H100i RGB Platinum",
        "descricao"   : "Sistema de refrigeração líquida all-in-one com radiador de 240 mm, iluminação RGB e ventoinhas de 120 mm para desempenho superior.",
        "cor"         : "Preto",
        "valor"       :  800.00,
        "modelo"      : "CW-9060039-WW",
        "peso"        :  0.87,
        "altura"      :  2.7,
        "comprimento" :  27.7,
        "largura"     :  12,
        "fabricante"  : "Corsair",
        "fornecedor"  : "Amazon Brasil",
        "subCategoria": "Coolers",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765695470_d06170b4fb_n.jpg",
        "imagens": [
            "https://live.staticflickr.com/65535/53764373612_5df5f46927_n.jpg",
            "https://live.staticflickr.com/65535/53765695475_b56f2b20af_n.jpg",
            "https://live.staticflickr.com/65535/53765695465_284981922e_n.jpg"
        ]
      },
      
      {
        "nome"        : "NZXT Kraken X63",
        "descricao"   : "Sistema de refrigeração líquida com radiador de 280 mm, anel de iluminação RGB e ventoinhas Aer P de 140 mm para resfriamento eficiente.",
        "cor"         : "Preto",
        "valor"       :  900.00,
        "modelo"      : "RL-KRX63-02",
        "peso"        :  1.430,
        "altura"      :  3,
        "comprimento" :  31.5,
        "largura"     :  14.3,
        "fabricante"  : "NZXT",
        "fornecedor"  : "Kabum",
        "subCategoria": "Coolers",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765614719_8bbf738c33_z.jpg",
        "imagens": [
            "https://live.staticflickr.com/65535/53765287911_62f749ef44_z.jpg",
            "https://live.staticflickr.com/65535/53765480548_3000785837_z.jpg",
            "https://live.staticflickr.com/65535/53765287916_384859fc83_w.jpg"
        ]
      },
      
      {
        "nome"        : "Be Quiet! Dark Rock Pro 4",
        "descricao"   : "Cooler de alto desempenho com design de torre dupla, ventoinhas Silent Wings de 135 mm e 120 mm, oferecendo operação ultra silenciosa.",
        "cor"         : "Preto",
        "valor"       :  700.00,
        "modelo"      : "BK022",
        "peso"        :  113,
        "altura"      :  16.3,
        "comprimento" :  13.6,
        "largura"     :  14.5,
        "fabricante"  : "Be Quiet!",
        "fornecedor"  : "Pichau",
        "subCategoria": "Coolers",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765291531_abe4da3ef8_n.jpg",
        "imagens": [
            "https://live.staticflickr.com/65535/53765618214_b633db1345_n.jpg",
            "https://live.staticflickr.com/65535/53765618224_988ddfd3e4_w.jpg",
            "https://live.staticflickr.com/65535/53765703120_96b69a1c8f_w.jpg"
        ]
      },
      {
        "nome"        : "Corsair RM750x",
        "descricao"   : "Fonte de alimentação modular de 750W com certificação 80 Plus Gold, ventoinha de 135mm e tecnologia Zero RPM para operação silenciosa.",
        "cor"         : "Preto",
        "valor"       : 750.00,
        "modelo"      : "CP-9020179-WW",
        "peso"        :  165.00,
        "altura"      :  8.6,
        "comprimento" :  16,
        "largura"     :  15,
        "fabricante"  : "Corsair",
        "fornecedor"  : "Girafa",
        "subCategoria": "Fonte",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53764383407_e23007cea4_z.jpg",
        "imagens": [
            "https://live.staticflickr.com/65535/53764383397_65abcb4907_z.jpg",
            "https://live.staticflickr.com/65535/53765486643_90d14be249_z.jpg",
            "https://live.staticflickr.com/65535/53765486638_04ce2ba349_z.jpg"
        ]
      },
      
      {
        "nome"        : "EVGA SuperNOVA 850 G3",
        "descricao"   : "Fonte de alimentação modular de 850W com certificação 80 Plus Gold, ventoinha de 130mm e design compacto para maior eficiência.",
        "cor"         : "Preto",
        "valor"       :  900.00,
        "modelo"      : "220-G3-0850-X1",
        "peso"        :  1.8,
        "altura"      :  8.5,
        "comprimento" :  15,
        "largura"     :  15,
        "fabricante"  : "EVGA",
        "fornecedor"  : "Amazon Brasil",
        "subCategoria": "Fonte",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765713130_35dcc9897e_n.jpg",
        "imagens": [
            "https://live.staticflickr.com/65535/53765302706_c677b2f9de_n.jpg",
            "https://live.staticflickr.com/65535/53765494723_8fbb669f63_z.jpg",
            "https://live.staticflickr.com/65535/53764391442_19df6d79cd_n.jpg"
        ]
      },
      
      {
        "nome"        : "Cooler Master MWE Gold 650 V2",
        "descricao"   : "Fonte de alimentação modular de 650W com certificação 80 Plus Gold, ventoinha de 120mm e design compacto para melhor fluxo de ar.",
        "cor"         : "Preto",
        "valor"       :  600.00,
        "modelo"      : "MPY-650V-AFBAG",
        "peso"        :  1.6,
        "altura"      :  8.6,
        "comprimento" :  16,
        "largura"     :  15,
        "fabricante"  : "Cooler Master",
        "fornecedor"  : "Cooler Master Brasil",
        "subCategoria": "Fonte",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765633649_3f13f85d39_n.jpg",
        "imagens": [
            "https://live.staticflickr.com/65535/53765718325_bbab399654_w.jpg",
            "https://live.staticflickr.com/65535/53765718320_005109e46e_z.jpg",
            "https://live.staticflickr.com/65535/53765718335_83a655e0e9_z.jpg"
        ]
      },
      
      {
        "nome"        : "Seasonic Focus GX-550",
        "descricao"   : "Fonte de alimentação modular de 550W com certificação 80 Plus Gold, ventoinha de 120mm e design compacto para operação eficiente e silenciosa.",
        "cor"         : "Preto",
        "valor"       :  550.00,
        "modelo"      : "SSR-550FX",
        "peso"        :  1.4,
        "altura"      :  8.6,
        "comprimento" :  14,
        "largura"     :  15,
        "fabricante"  : "Seasonic",
        "fornecedor"  : "Kabum",
        "subCategoria": "Fonte",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765722020_37fda35bbc_z.jpg",
        "imagens": [
            "https://live.staticflickr.com/65535/53765722015_f16e6f35f7_z.jpg",
            "https://live.staticflickr.com/65535/53765637454_7f2cba8374_w.jpg",
            "https://live.staticflickr.com/65535/53764400622_f476feb940_n.jpg"
        ]
      },
      
      {
        "nome"        : "Thermaltake Toughpower PF1 ARGB 850W",
        "descricao"   : "Fonte de alimentação modular de 850W com certificação 80 Plus Platinum, ventoinha de 140mm com iluminação ARGB e componentes de alta qualidade.",
        "cor"         : "Preto",
        "valor"       :  1100.00,
        "modelo"      : "PS-TPD-0850F3FAPU-1",
        "peso"        :  2,
        "altura"      :  8.6,
        "comprimento" :  16,
        "largura"     :  15,
        "fabricante"  : "Thermaltake",
        "fornecedor"  : "Kabum",
        "desconto": "5",
        "subCategoria": "Fonte",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765643234_3084411d59_z.jpg",
        "imagens": [
            "https://live.staticflickr.com/65535/53765508993_8b3126099c_z.jpg",
            "https://live.staticflickr.com/65535/53765643239_f4644769f6_z.jpg",
            "https://live.staticflickr.com/65535/53764406482_a75ae03348_z.jpg"
        ]
      },
      {
        "nome"        : "Corsair Vengeance LPX 16GB (2 x 8GB) DDR4 3200MHz",
        "descricao"   : "Kit de memória RAM DDR4 de 16GB (2 módulos de 8GB), 3200MHz, ideal para desempenho em jogos e multitarefas.",
        "cor"         : "Preto",
        "valor"       :  450.00,
        "modelo"      : "CMK16GX4M2B3200C16",
        "peso"        :  0.045,
        "altura"      :  3.4,
        "comprimento" :  13.5,
        "largura"     :  0.7,
        "fabricante"  : "Corsair",
        "fornecedor"  : "Amazon Brasil",
        "subCategoria": "Memória RAM",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765650539_e6a61c6c7e_z.jpg",
        "imagens": [
            "https://live.staticflickr.com/65535/53765735490_269f380628_z.jpg",
            "https://live.staticflickr.com/65535/53765323806_a3f140112f_z.jpg",
            "https://live.staticflickr.com/65535/53765650534_afd96e8bfe_n.jpg"
        ]
      },
      
      {
        "nome"        : "Kingston HyperX Fury 8GB DDR4 2666MHz",
        "descricao"   : "Módulo de memória RAM DDR4 de 8GB, 2666MHz, com dissipador de calor de perfil baixo para melhor desempenho e resfriamento.",
        "cor"         : "Preto",
        "valor"       :  250.00,
        "modelo"      : "HX426C16FB3/8",
        "peso"        : 0.04,
        "altura"      :  3.4,
        "comprimento" :  13.3,
        "largura"     :  0.7,
        "fabricante"  : "Kingston",
        "fornecedor"  : "Pichau",
        "desconto": "10",
        "subCategoria": "Memória RAM",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765655509_a39e90af37_z.jpg",
        "imagens": [
            "https://live.staticflickr.com/65535/53765521423_b84dd2e0f7_z.jpg",
            "https://live.staticflickr.com/65535/53765655489_73d413e18d_z.jpg",
            "https://live.staticflickr.com/65535/53765655514_4ed5cbb834_m.jpg"
        ]
      },
      
      {
        "nome"        : "G.Skill Trident Z RGB 16GB (2 x 8GB) DDR4 3600MHz",
        "descricao"   : "Kit de memória RAM DDR4 de 16GB (2 módulos de 8GB), 3600MHz, com iluminação RGB personalizável e alto desempenho.",
        "cor"         : "Preto com RGB",
        "valor"       :  650.00,
        "modelo"      : "F4-3600C18D-16GTZRX",
        "peso"        : 0.07,
        "altura"      :  4.4,
        "comprimento" :  13.5,
        "largura"     :  0.7,
        "fabricante"  : "G.Skill",
        "fornecedor"  : "Kabum",
        "subCategoria": "Memória RAM",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765661764_b28d15f621_n.jpg",
        "imagens": [
            "https://live.staticflickr.com/65535/53764425137_8643c2eec7_n.jpg",
            "https://live.staticflickr.com/65535/53765527808_a1139b0ed6_n.jpg",
            "https://live.staticflickr.com/65535/53765335076_24cf52e632_n.jpg"
        ]
      },
      
      {
        "nome"        : "Crucial Ballistix 32GB (2 x 16GB) DDR4 3200MHz",
        "descricao"   : "Kit de memória RAM DDR4 de 32GB (2 módulos de 16GB), 3200MHz, projetado para alto desempenho e estabilidade em jogos e aplicações pesadas.",
        "cor"         : "Vermelho",
        "valor"       :  950.00,
        "modelo"      : "BL2K16G32C16U4R",
        "peso"        : 0.08,
        "altura"      :  4,
        "comprimento" :  13.3,
        "largura"     : 0.7,
        "fabricante"  : "Crucial",
        "fornecedor"  : "Cissa Magazine",
        "subCategoria": "Memória RAM",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53764436897_fb76ab259a_n.jpg",
        "imagens": [
            "https://live.staticflickr.com/65535/53765758860_cec46d5346_n.jpg",
            "https://live.staticflickr.com/65535/53765346786_7d1e6ab910_n.jpg",
            "https://live.staticflickr.com/65535/53765539943_aeb5673c7f_n.jpg"
        ]
      },
      
      {
        "nome"        : "TeamGroup T-Force Delta RGB 16GB (2 x 8GB) DDR4 3200MHz",
        "descricao"   : "Kit de memória RAM DDR4 de 16GB (2 módulos de 8GB), 3200MHz, com iluminação RGB vibrante e design moderno.",
        "cor"         : "Branco com RGB",
        "valor"       :  480.00,
        "modelo"      : "TF3D416G3200HC16CDC01",
        "peso"        :  0.06,
        "altura"      :  4.9,
        "comprimento" :  14.5,
        "largura"     :  0.8,
        "fabricante"  : "TeamGroup",
        "fornecedor"  : "Cissa Magazine",
        "subCategoria": "Memória RAM",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53764453877_9378b76a20_n.jpg",
        "imagens": [
            "https://live.staticflickr.com/65535/53765556913_738f95475c_n.jpg",
            "https://live.staticflickr.com/65535/53765775945_4791e73f4a_n.jpg",
            "https://live.staticflickr.com/65535/53765556918_9ac0943c97_m.jpg"
        ]
      },
      {
        "nome"        : "NVIDIA GeForce RTX 3080",
        "descricao"   : "Placa de vídeo poderosa com arquitetura Ampere, 10 GB de memória GDDR6X, Ray Tracing em tempo real e DLSS para jogos em 4K.",
        "cor"         : "Preto",
        "valor"       :  5000.00,
        "modelo"      : "GeForce RTX 3080",
        "peso"        :  2.1,
        "altura"      :  13.6,
        "comprimento" :  28.5,
        "largura"     :  14,
        "fabricante"  : "NVIDIA",
        "fornecedor"  : "NVIDIA Brasil",
        "subCategoria": "Placa de Vídeo",
        "desconto": "15",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765562333_9a640f6b07_n.jpg",
        "imagens": [
            "https://live.staticflickr.com/65535/53765369476_5eb6fee605_w.jpg",
            "https://live.staticflickr.com/65535/53765781785_a4db5eb6a7_w.jpg",
            "https://live.staticflickr.com/65535/53765781765_b53a629fd6_n.jpg"
        ]
      },
      
      {
        "nome"        : "AMD Radeon RX 6800 XT",
        "descricao"   : "Placa de vídeo com arquitetura RDNA 2, 16 GB de memória GDDR6, Ray Tracing e suporte para resolução 4K e VR.",
        "cor"         : "Preto",
        "valor"       :  4500.00,
        "modelo"      : "Radeon RX 6800 XT",
        "peso"        :  1.5,
        "altura"      :  12.8,
        "comprimento" :  26.7,
        "largura"     :  15,
        "fabricante"  : "AMD",
        "fornecedor"  : "AMD Brasil",
        "subCategoria": "Placa de Vídeo",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765786275_a2bccf6e54_z.jpg",
        "imagens": [
            "https://live.staticflickr.com/65535/53765700214_851eb2fb9a_z.jpg",
            "https://live.staticflickr.com/65535/53765786270_951a295200_z.jpg",
            "https://live.staticflickr.com/65535/53765566823_ee47b671ca_z.jpg"
        ]
      },
      
      {
        "nome"        : "NVIDIA GeForce RTX 3060 Ti",
        "descricao"   : "Placa de vídeo com arquitetura Ampere, 8 GB de memória GDDR6, Ray Tracing em tempo real e desempenho otimizado para jogos AAA.",
        "cor"         : "Preto",
        "valor"       :  3000.00,
        "modelo"      : "GeForce RTX 3060 Ti",
        "peso"        :  1.2,
        "altura"      :  11.2,
        "comprimento" :  24.2,
        "largura"     :  17,
        "fabricante"  : "NVIDIA",
        "fornecedor"  : "NVIDIA Brasil",
        "subCategoria": "Placa de Vídeo",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53764470112_954725e0d7_z.jpg",
        "imagens": [
            "https://live.staticflickr.com/65535/53765792390_27ca4f004a_z.jpg",
            "https://live.staticflickr.com/65535/53765792385_b20eeeb14a_z.jpg",
            "https://live.staticflickr.com/65535/53765380106_8f54ee5c73_z.jpg"
        ]
      },
      
      {
        "nome"        : "AMD Radeon RX 6600 XT",
        "descricao"   : "Placa de vídeo com arquitetura RDNA 2, 12 GB de memória GDDR6, desempenho avançado para jogos em 1440p e suporte para VR.",
        "cor"         : "Preto",
        "valor"       :  3200.00,
        "modelo"      : "Radeon RX 6700 XT",
        "peso"        :  1.4,
        "altura"      :  11.3,
        "comprimento" :  26.7,
        "largura"     :  11.5,
        "fabricante"  : "AMD",
        "fornecedor"  : "AMD Brasil",
        "subCategoria": "Placa de Vídeo",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765710959_e7b38e86de_z.jpg",
        "imagens": [
            "https://live.staticflickr.com/65535/53764474987_bcc4d282d2_z.jpg",
            "https://live.staticflickr.com/65535/53765796990_732350d88f_z.jpg",
            "https://live.staticflickr.com/65535/53764474962_8cfeb5a5de_z.jpg"
        ]
      },
      
      {
        "nome"        : "NVIDIA GeForce RTX 3090",
        "descricao"   : "Placa de vídeo com arquitetura Ampere, 24 GB de memória GDDR6X, Ray Tracing em tempo real e desempenho excepcional em resoluções 8K.",
        "cor"         : "Preto",
        "valor"       :  8000.00,
        "modelo"      : "GeForce RTX 3090",
        "peso"        :  2.3,
        "altura"      :  13.9,
        "comprimento" :  31.3,
        "largura"     :  17.6,
        "fabricante"  : "NVIDIA",
        "fornecedor"  : "NVIDIA Brasil",
        "subCategoria": "Placa de Vídeo",
        "desconto": "10",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765718134_18fe0db718_z.jpg",
        "imagens": [
            "https://live.staticflickr.com/65535/53765584668_ef61618b6c_z.jpg",
            "https://live.staticflickr.com/65535/53765584658_3cb018e791_z.jpg",
            "https://live.staticflickr.com/65535/53765584653_d08e1962da_z.jpg"
        ]
      },
      {
        "nome"        : "ASUS ROG Strix Z690-E Gaming WiFi",
        "descricao"   : "Placa mãe para processadores Intel, socket LGA 1200, chipset Z590, suporte para PCIe 4.0, Wi-Fi 6E integrado, RGB Aura Sync e conectividade USB 3.2 Gen 2x2.",
        "cor"         : "Preto",
        "valor"       :  2500.00,
        "modelo"      : "ROG Strix Z590-E Gaming WiFi",
        "peso"        :  1.5,
        "altura"      :  30.5,
        "comprimento" :  24.4,
        "largura"     :  3.5,
        "fabricante"  : "ASUS",
        "fornecedor"  : "ASUS Brasil",
        "desconto": "30",
        "subCategoria": "Placa Mãe",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53764502842_658277baab_n.jpg",
        "imagens": [
            "https://live.staticflickr.com/65535/53764502847_054f7e1acc_n.jpg",
            "https://live.staticflickr.com/65535/53765738589_6856e6a84b_n.jpg",
            "https://live.staticflickr.com/65535/53765824490_7e3376c5b8_n.jpg"
        ]
      },
      
      {
        "nome"        : "GIGABYTE B550 AORUS ELITE",
        "descricao"   : "Placa mãe para processadores AMD Ryzen, socket AM4, chipset B550, suporte para PCIe 4.0, RGB Fusion 2.0, áudio de alta qualidade e conectividade USB 3.2 Gen 2.",
        "cor"         : "Preto",
        "valor"       :  800.00,
        "modelo"      : "B550 AORUS ELITE",
        "peso"        :  1,
        "altura"      :  305,
        "comprimento" :  244,
        "largura"     : 3.5,
        "fabricante"  : "GIGABYTE",
        "fornecedor"  : "GIGABYTE Brasil",
        "subCategoria": "Placa Mãe",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765630393_20d29283a3_z.jpg",
        "imagens": [
            "https://live.staticflickr.com/65535/53765850825_0f28bb2492_n.jpg",
            "https://live.staticflickr.com/65535/53764529162_71bc4bcf71_n.jpg",
            "https://live.staticflickr.com/65535/53765438156_65260b5f2a_z.jpg"
        ]
      },
      
      {
        "nome"        : "MSI MAG B460M MORTAR WIFI",
        "descricao"   : "Placa mãe para processadores Intel, socket LGA 1200, chipset B460, suporte para PCIe 3.0, Wi-Fi 6 integrado, Mystic Light RGB e áudio de alta definição.",
        "cor"         : "Preto",
        "valor"       :  600.00,
        "modelo"      : "MAG B460M MORTAR WIFI",
        "peso"        : 0.8,
        "altura"      :  244,
        "comprimento" :  244,
        "largura"     : 3.5,
        "fabricante"  : "MSI",
        "fornecedor"  : "MSI Brasil",
        "subCategoria": "Placa Mãe",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765634648_98c04e122e_n.jpg",
        "imagens": [
            "https://live.staticflickr.com/65535/53765855285_694e35f858_n.jpg",
            "https://live.staticflickr.com/65535/53765855280_a8fa6e9b5f_n.jpg",
            "https://live.staticflickr.com/65535/53765442196_4bffc15192_n.jpg"
        ]
      },
      
      {
        "nome"        : "ASRock B550 Phantom Gaming 4",
        "descricao"   : "Placa mãe para processadores AMD Ryzen, socket AM4, chipset B550, suporte para PCIe 4.0, tecnologia de áudio Nahimic e RGB integrado.",
        "cor"         : "Preto",
        "valor"       :  700.00,
        "modelo"      : "B550 Phantom Gaming 4",
        "peso"        :  0.9,
        "altura"      :  305,
        "comprimento" :  244,
        "largura"     : 3.5,
        "fabricante"  : "ASRock",
        "fornecedor"  : "Amazon Brasil",
        "subCategoria": "Placa Mãe",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765637823_9f6f5a58bf_n.jpg",
        "imagens": [
            "https://live.staticflickr.com/65535/53765637833_fb15309846_n.jpg",
            "https://live.staticflickr.com/65535/53765771479_6cd4301b4b_n.jpg",
            "https://live.staticflickr.com/65535/53764536227_968610455b_n.jpg"
        ]
      },
      
      {
        "nome"        : "ASUS TUF Gaming B450M-PRO II",
        "descricao"   : "Placa mãe para processadores AMD Ryzen, socket AM4, chipset B450, suporte para PCIe 3.0, tecnologia TUF Protection, Aura Sync RGB e áudio de alta fidelidade.",
        "cor"         : "Preto",
        "valor"       :  500.00,
        "modelo"      : "TUF Gaming B450M-PRO II",
        "peso"        :  0.7,
        "altura"      :  244,
        "comprimento" :  244,
        "largura"     : 3.5,
        "fabricante"  : "ASUS",
        "fornecedor"  : "ASUS Brasil",
        "subCategoria": "Placa Mãe",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765777289_492995640d_z.jpg",
        "imagens": [
            "https://live.staticflickr.com/65535/53765777299_feb285438e_w.jpg",
            "https://live.staticflickr.com/65535/53764541992_b7a873eba5_w.jpg",
            "https://live.staticflickr.com/65535/53765777279_84e12d85c1_z.jpg"
        ]
      },
      {
        "nome": "AMD Ryzen 9 5900X",
        "descricao": "Processador de 12 núcleos e 24 threads, frequência base de 3.7 GHz, frequência de boost de até 4.8 GHz, cache L3 de 64 MB, compatível com socket AM4.",
        "cor": "Preto",
        "valor": 3500.00,
        "modelo": "Ryzen 9 5900X",
        "peso": 0.65,
        "altura": 2,
        "comprimento": 10,
        "largura": 12,
        "fabricante": "AMD",
        "fornecedor": "AMD Brasil",
        "subCategoria": "Processadores",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765454056_e9827e5430_m.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53765454066_d0bbb948ce_m.jpg",
          "https://live.staticflickr.com/65535/53765647508_3e615bc1be_m.jpg",
          "https://live.staticflickr.com/65535/53765780909_655944d353_m.jpg"
        ]
      },
      {
        "nome": "Intel Core i9-11900K",
        "descricao": "Processador de 8 núcleos e 16 threads, frequência base de 3.5 GHz, frequência de boost de até 5.3 GHz, cache L3 de 16 MB, compatível com socket LGA 1200.",
        "cor": "Prateado",
        "valor": 2000.00,
        "modelo": "Core i9-11900K",
        "peso": 0.55,
        "altura": 2.5,
        "comprimento": 12,
        "largura": 12,
        "fabricante": "Intel",
        "fornecedor": "Intel Brasil",
        "subCategoria": "Processadores",
        "desconto": "10",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765784254_1dbd7cf9c0_n.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53765457046_3058fce8a6_n.jpg",
          "https://live.staticflickr.com/65535/53765457051_18500f8b79_n.jpg",
          "https://live.staticflickr.com/65535/53765457066_f81e6b4651_n.jpg"
        ]
      },
      {
        "nome": "AMD Ryzen 5 5600X",
        "descricao": "Processador de 6 núcleos e 12 threads, frequência base de 3.7 GHz, frequência de boost de até 4.6 GHz, cache L3 de 32 MB, compatível com socket AM4.",
        "cor": "Preto",
        "valor":  1200.00,
        "modelo": "Ryzen 5 5600X",
        "peso": 0.5,
        "altura": 2,
        "comprimento": 10,
        "largura": 12,
        "fabricante": "AMD",
        "fornecedor": "AMD Brasil",
        "subCategoria": "Processadores",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53764553077_507b266ee1_w.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53765654688_088b67452e_n.jpg",
          "https://live.staticflickr.com/65535/53765654673_e012104275_w.jpg",
          "https://live.staticflickr.com/65535/53765788434_52f7ea9572_n.jpg"
        ]
      },
      {
        "nome": "Intel Core i5-11600K",
        "descricao": "Processador de 6 núcleos e 12 threads, frequência base de 3.9 GHz, frequência de boost de até 4.9 GHz, cache L3 de 12 MB, compatível com socket LGA 1200.",
        "cor": "Prateado",
        "valor": 800.00,
        "modelo": "Core i5-11600K",
        "peso": 0.45,
        "altura": 2.5,
        "comprimento": 12,
        "largura": 12,
        "fabricante": "Intel",
        "fornecedor": "Intel Brasil",
        "subCategoria": "Processadores",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765659898_8888e5eb14_w.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53765880150_37cb674253_z.jpg",
          "https://live.staticflickr.com/65535/53765793894_3b1831e1e6_n.jpg",
          "https://live.staticflickr.com/65535/53764558572_d365695336_n.jpg"
        ]
      },
      {
        "nome": "AMD Ryzen 7 5800X",
        "descricao": "Processador de 8 núcleos e 16 threads, frequência base de 3.8 GHz, frequência de boost de até 4.7 GHz, cache L3 de 32 MB, compatível com socket AM4.",
        "cor": "Preto",
        "valor":  1800.00,
        "modelo": "Ryzen 7 5800X",
        "peso": 0.6,
        "altura": 2,
        "comprimento": 10,
        "largura": 12,
        "fabricante": "AMD",
        "fornecedor": "AMD Brasil",
        "subCategoria": "Processadores",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53764561092_d228d92025_w.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53765882515_2cf2c3467d_w.jpg",
          "https://live.staticflickr.com/65535/53765882500_78832c05b9_n.jpg",
          "https://live.staticflickr.com/65535/53765796534_4c02019f72_w.jpg"
        ]
      },
      {
        "nome": "Kit Upgrade Gamer AMD Ryzen 5",
        "descricao": "Inclui processador AMD Ryzen 5 3600, placa-mãe B450M, 16GB de memória RAM DDR4 e SSD 240GB.",
        "cor": "Preto",
        "valor": 2299.80,
        "modelo": "Ryzen 5 Upgrade",
        "peso": 1.5,
        "altura": 10,
        "comprimento": 30,
        "largura": 25,
        "fabricante": "AMD",
        "fornecedor": "AMD Brasil",
        "subCategoria": "Gamer",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765886825_eca53affd1_n.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53765666713_006169bb5a_w.jpg",
          "https://live.staticflickr.com/65535/53765800919_faae179542_z.jpg",
          "https://live.staticflickr.com/65535/53764565047_4be1dce102_z.jpg"
        ]
      },
      {
        "nome": "Kit Upgrade Gamer Intel Core i5",
        "descricao": "Inclui processador Intel Core i5 10400F, placa-mãe Asus H510, 16GB de memória RAM DDR4 e SSD 240GB.",
        "cor": "Preto",
        "valor":  2499.00,
        "modelo": "Core i5 Upgrade",
        "peso": 1.6,
        "altura": 10,
        "comprimento": 30,
        "largura": 25,
        "fabricante": "Intel",
        "fornecedor": "Intel Brasil",
        "subCategoria": "Gamer",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765894790_b6bfcdc5f0_w.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53765894780_13791946a5_w.jpg",
          "https://live.staticflickr.com/65535/53765808629_fe989b1990_z.jpg",
          "https://live.staticflickr.com/65535/53765674148_c3e3a0c44a_z.jpg"
        ]
      },
      {
        "nome": "Kit Upgrade Gamer AMD Ryzen 7",
        "descricao": "Inclui processador AMD Ryzen 7 3700X, placa-mãe B450M, 16GB de memória RAM DDR4 e SSD 500GB.",
        "cor": "Preto",
        "valor":  3499.90,
        "modelo": "Ryzen 7 Upgrade",
        "peso": 1.7,
        "altura": 10,
        "comprimento": 30,
        "largura": 25,
        "fabricante": "AMD",
        "fornecedor": "AMD Brasil",
        "subCategoria": "Gamer",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765679108_91ea1b46fd_n.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53765679103_3f35a098fc_w.jpg",
          "https://live.staticflickr.com/65535/53765899950_89b14c0940_z.jpg",
          "https://live.staticflickr.com/65535/53765813849_5af7720981_z.jpg"
        ]
      },
      {
        "nome": "Kit Upgrade Gamer Intel Core i7",
        "descricao": "Inclui processador Intel Core i7 10700F, placa-mãe Z490, 16GB de memória RAM DDR4 e SSD 500GB.",
        "cor": "Preto",
        "valor":  3799.90,
        "modelo": "Core i7 Upgrade",
        "peso": 1.8,
        "altura": 10,
        "comprimento": 30,
        "largura": 25,
        "fabricante": "Intel",
        "fornecedor": "Intel Brasil",
        "subCategoria": "Gamer",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53764646957_6eab81ca13_n.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53764646962_e230e9825e_w.jpg",
          "https://live.staticflickr.com/65535/53765556476_007649a861_z.jpg",
          "https://live.staticflickr.com/65535/53764646977_52d74c9df8_z.jpg"
        ]
      },
      {
        "nome": "Kit Upgrade Gamer AMD Ryzen 9",
        "descricao": "Inclui processador AMD Ryzen 9 3900X, placa-mãe X570, 32GB de memória RAM DDR4 e SSD 1TB.",
        "cor": "Preto",
        "valor":  4999.90,
        "modelo": "Ryzen 9 Upgrade",
        "peso": 2.0,
        "altura": 10,
        "comprimento": 30,
        "largura": 25,
        "fabricante": "AMD",
        "fornecedor": "AMD Brasil",
        "subCategoria": "Gamer",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765887344_d7e4620bf9_n.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53765752768_efb3bfec24_m.jpg",
          "https://live.staticflickr.com/65535/53765559956_17fc95daaf_m.jpg",
          "https://live.staticflickr.com/65535/53765973040_7633a88928_n.jpg"
        ]
      },
      {
        "nome": "Kit Periféricos Gamer RGB",
        "descricao": "Inclui teclado mecânico, mouse óptico, mousepad XL e fone de ouvido com iluminação RGB.",
        "cor": "Preto",
        "valor": 399.90,
        "modelo": "RGB Gamer Kit",
        "peso": 2,
        "altura": 15,
        "comprimento": 40,
        "largura": 30,
        "fabricante": "GamerTech",
        "fornecedor": "Mega Mamute",
        "subCategoria": "Periféricos",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765570381_6bb13ee520_z.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53765982895_5108bffa98_z.jpg",
          "https://live.staticflickr.com/65535/53764661117_ccfc635a35_z.jpg",
          "https://live.staticflickr.com/65535/53764661107_852921b1c8_w.jpg"
        ]
      },
      {
        "nome": "Kit Periféricos Gamer Pro",
        "descricao": "Inclui teclado membrana, mouse óptico, mousepad XL e headset gamer com microfone retrátil.",
        "cor": "Preto",
        "valor":  299.90,
        "modelo": "Gamer Pro Kit",
        "peso": 1.5,
        "altura": 12,
        "comprimento": 35,
        "largura": 25,
        "fabricante": "GamerGear",
        "fornecedor": "Mega Mamute",
        "subCategoria": "Periféricos",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765900749_43a9160da1_n.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53765986275_2b57c413b4_n.jpg",
          "https://live.staticflickr.com/65535/53765900744_acca5e4d74_n.jpg",
          "https://live.staticflickr.com/65535/53765986265_776c3e3416_n.jpg"
        ]
      },
      {
        "nome": "Kit Periféricos Gamer Elite",
        "descricao": "Inclui teclado semi-mecânico, mouse óptico, mousepad XL e headset gamer com cancelamento de ruído.",
        "cor": "Preto",
        "valor":  449.90,
        "modelo": "Gamer Elite Kit",
        "peso": 2.2,
        "altura": 15,
        "comprimento": 40,
        "largura": 30,
        "fabricante": "EliteTech",
        "fornecedor": "Amazon Brasil",
        "subCategoria": "Periféricos",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765989850_73ca3ac1bc_z.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53765904584_eefcf77212_z.jpg",
          "https://live.staticflickr.com/65535/53765904579_180244e6c5_n.jpg",
          "https://live.staticflickr.com/65535/53765904569_7f11271e44_n.jpg"
        ]
      },
      {
        "nome": "Kit Periféricos Gamer Profissional",
        "descricao": "Inclui teclado mecânico, mouse óptico com DPI ajustável, mousepad XL e headset gamer com som surround.",
        "cor": "Preto",
        "valor":  599.90,
        "modelo": "Gamer Profissional Kit",
        "peso": 2.5,
        "altura": 15,
        "comprimento": 40,
        "largura": 30,
        "fabricante": "ProGaming",
        "fornecedor": "Amazon Brasil",
        "subCategoria": "Periféricos",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765581071_54d7356c24_n.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53765908614_1a1fe9ab6b_n.jpg",
          "https://live.staticflickr.com/65535/53764671447_c93acff5c9_n.jpg",
          "https://live.staticflickr.com/65535/53765581056_32db875b4f_n.jpg"
        ]
      },
      {
        "nome": "Kit Periféricos Gamer Sem Fio",
        "descricao": "Inclui teclado sem fio, mouse sem fio, mousepad XL e headset gamer sem fio com bateria de longa duração.",
        "cor": "Preto",
        "valor": 699.90,
        "modelo": "Gamer Sem Fio Kit",
        "peso": 2.8,
        "altura": 15,
        "comprimento": 40,
        "largura": 30,
        "fabricante": "WirelessGamer",
        "fornecedor": "Amazon Brasil",
        "subCategoria": "Periféricos",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765923039_a4a0346fea_z.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53765788098_d6ac531d50_w.jpg",
          "https://live.staticflickr.com/65535/53765923049_4ba702a0d6_n.jpg",
          "https://live.staticflickr.com/65535/53766007905_cc8bd8bb2c_z.jpg"
        ]
      },
      {
        "nome": "Kit Upgrade AMD Ryzen 5 5600X",
        "descricao": "Kit composto por processador AMD Ryzen 5 5600X, placa-mãe B450M  e 8GB de memória RAM DDR4.",
        "cor": "Preto",
        "valor":  2199.90,
        "modelo": "5600X/B450/16GB",
        "peso": 1.5,
        "altura": 5,
        "comprimento": 25,
        "largura": 30,
        "fabricante": "AMD",
        "fornecedor": "AMD Brasil",
        "subCategoria": "Upgrade",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765793603_4ac405df28_n.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53766013455_5c1ba8c62b_n.jpg",
          "https://live.staticflickr.com/65535/53765793613_7478ce4024_n.jpg",
          "https://live.staticflickr.com/65535/53765600641_4534543ecb_w.jpg"
        ]
      },
      {
        "nome": "Kit Upgrade Intel Core i7 10700K",
        "descricao": "Kit com processador Intel Core i7 10700K, placa-mãe Z490 e 16GB de memória RAM DDR4.",
        "cor": "Preto",
        "valor":  2799.90,
        "modelo": "10700K/Z490/16GB",
        "peso": 1.6,
        "altura": 5,
        "comprimento": 26,
        "largura": 31,
        "fabricante": "Intel",
        "fornecedor": "Intel Brasil",
        "subCategoria": "Upgrade",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765930844_eec825b7b3_n.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53764693122_62b0fbba48_n.jpg",
          "https://live.staticflickr.com/65535/53765930839_93f167a551_z.jpg",
          "https://live.staticflickr.com/65535/53764693127_e33043064c_z.jpg"
        ]
      },
      {
        "nome": "Kit Upgrade ASUS ROG Strix",
        "descricao": "Kit com placa-mãe ASUS ROG Strix B550-F, processador AMD Ryzen 7 3700X e 32GB de memória RAM.",
        "cor": "Preto",
        "valor": 3499.90,
        "modelo": "3700X/B550-F/32GB",
        "peso": 1.8,
        "altura": 6,
        "comprimento": 27,
        "largura": 32,
        "fabricante": "ASUS",
        "fornecedor": "ASUS Brasil",
        "subCategoria": "Upgrade",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765607111_03a09d63bc_z.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53766020450_fe6106e3b7_z.jpg",
          "https://live.staticflickr.com/65535/53765800518_fdffa68fb9_z.jpg",
          "https://live.staticflickr.com/65535/53764565047_4be1dce102_z.jpg"
        ]
      },
      {
        "nome": "Kit Upgrade MSI MPG Z490 Gaming Edge",
        "descricao": "Kit composto por placa-mãe MSI MPG Z490 Gaming Edge, processador Intel Core i5 10600K e 16GB de memória RAM.",
        "cor": "Preto",
        "valor": 2399.90,
        "modelo": "10600K/Z490/16GB",
        "peso": 1.7,
        "altura": 5,
        "comprimento": 25,
        "largura": 31,
        "fabricante": "MSI",
        "fornecedor": "MSI Brasil",
        "subCategoria": "Upgrade",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53766029015_61e0c9224e_w.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53766029010_a6a965c890_n.jpg",
          "https://live.staticflickr.com/65535/53765809018_92ab625a52_n.jpg",
          "https://live.staticflickr.com/65535/53765973040_7633a88928_n.jpg"
        ]
      },
      {
        "nome": "Kit Upgrade Gigabyte Aorus B550 Elite",
        "descricao": "Kit com placa-mãe Gigabyte Aorus B550 Elite, processador AMD Ryzen 5 3600 e 16GB de memória RAM.",
        "cor": "Preto",
        "valor": 2099.90,
        "modelo": "3600/B550 Elite/16GB",
        "peso": 1.6,
        "altura": 5,
        "comprimento": 26,
        "largura": 30,
        "fabricante": "Gigabyte",
        "fornecedor": "GIGABYTE Brasil",
        "subCategoria": "Upgrade",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53764710152_33c7744b46_w.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53765812573_96484ef754_w.jpg",
          "https://live.staticflickr.com/65535/53765619861_af74ceb0e9_n.jpg",
          "https://live.staticflickr.com/65535/53765619856_a183db8a01_w.jpg"
        ]
      },
      {
        "nome": "ASUS ROG Swift PG279Q 27\" Gaming Monitor",
        "descricao": "Monitor gaming de 27 polegadas com resolução WQHD (2560x1440), taxa de atualização de 165Hz e tecnologia G-SYNC para uma experiência de jogo suave e sem tearing.",
        "cor": "Preto",
        "valor": 4999.00,
        "modelo": "PG279Q",
        "peso": 7.3,
        "altura": 44.3,
        "comprimento": 62.2,
        "largura": 23.7,
        "fabricante": "ASUS",
        "fornecedor": "ASUS Brasil",
        "subCategoria": "Monitores Gamers",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765817683_b658a687aa_n.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53765817673_01c8c57b6b_n.jpg",
          "https://live.staticflickr.com/65535/53765625136_c17d1dac90_n.jpg",
          "https://live.staticflickr.com/65535/53765817668_7e6a7dd0e4_n.jpg"
        ]
      },
      {
        "nome": "Acer Predator XB273K 27\" 4K UHD Gaming Monitor",
        "descricao": "Monitor gaming de 27 polegadas com resolução 4K UHD (3840x2160), tecnologia G-SYNC, HDR e uma taxa de atualização de até 144Hz para imagens ultra-nítidas e jogabilidade fluida.",
        "cor": "Preto/Vermelho",
        "valor": 6299.90,
        "modelo": "XB273K",
        "peso": 7.6,
        "altura": 41.4,
        "comprimento": 61.4,
        "largura": 23.9,
        "fabricante": "Acer",
        "fornecedor": "Acer",
        "subCategoria": "Monitores Gamers",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53764717887_494d776181_n.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53765627636_460c6a0b8f_n.jpg",
          "https://live.staticflickr.com/65535/53766040635_6d907e798e_n.jpg",
          "https://live.staticflickr.com/65535/53764717892_7ed41866a1_w.jpg"
        ]
      },
      {
        "nome": "LG UltraGear 34GK950F-B 34\" Curved UltraWide QHD Gaming Monitor",
        "descricao": "Monitor gaming ultrawide de 34 polegadas com resolução UltraWide QHD (3440x1440), taxa de atualização de 144Hz e tecnologia AMD FreeSync 2 para uma experiência imersiva de jogo.",
        "cor": "Preto",
        "valor": 7499.00,
        "modelo": "34GK950F-B",
        "peso": 8.6,
        "altura": 56.9,
        "comprimento": 83.0,
        "largura": 26.9,
        "fabricante": "LG",
        "fornecedor": "Amazon Brasil",
        "subCategoria": "Monitores Gamers",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53764720337_d256f51def_n.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53765822863_0753ce439f_n.jpg",
          "https://live.staticflickr.com/65535/53766043045_4f5125c0d1_n.jpg",
          "https://live.staticflickr.com/65535/53764720332_d8189a03ee_n.jpg"
        ]
      },
      {
        "nome": "MSI Optix MAG272CQR 27\" Curved QHD Gaming Monitor",
        "descricao": "Monitor gaming curvo de 27 polegadas com resolução QHD (2560x1440), taxa de atualização de 165Hz, tecnologia FreeSync e HDR para uma jogabilidade suave e cores vibrantes.",
        "cor": "Preto/Vermelho",
        "valor": 3299.80,
        "modelo": "Optix MAG272CQR",
        "peso": 6.1,
        "altura": 51.0,
        "comprimento": 61.2,
        "largura": 27.2,
        "fabricante": "MSI",
        "fornecedor": "MSI Brasil",
        "subCategoria": "Monitores Gamers",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53764725127_2ce0e20da9_n.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53765961839_805e5a8b1b_w.jpg",
          "https://live.staticflickr.com/65535/53764723702_1862b5e15f_n.jpg",
          "https://live.staticflickr.com/65535/53764723697_f536c86004_w.jpg"
        ]
      },
      {
        "nome": "BenQ ZOWIE XL2546 24.5\" 240Hz Gaming Monitor",
        "descricao": "Monitor gaming de 34.5 polegadas com taxa de atualização de 240Hz, tecnologia DyAc para redução de blur em movimento, e-Sports Shield para melhor visibilidade e altura ajustável.",
        "cor": "Preto/Vermelho",
        "valor": 2999.90,
        "modelo": "XL2546",
        "peso": 7.5,
        "altura": 51.5,
        "comprimento": 57.5,
        "largura": 22.6,
        "fabricante": "BenQ",
        "fornecedor": "Kabum",
        "subCategoria": "Monitores Gamers",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765838523_d333290112_z.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53765974574_9ccd604113_w.jpg",
          "https://live.staticflickr.com/65535/53766059020_e2ef42f0cd_n.jpg",
          "https://live.staticflickr.com/65535/53764735837_eb8181aa92_n.jpg"
        ]
      },
      {
        "nome": "Dell UltraSharp U2720Q 27\" 4K Monitor",
        "descricao": "Monitor profissional de 27 polegadas com resolução 4K UHD (3840x2160), calibrado de fábrica com precisão de cores Delta-E inferior a 2 e ampla cobertura de cores.",
        "cor": "Preto",
        "valor": 2399.99,
        "modelo": "U2720Q",
        "peso": 6.35,
        "altura": 45.99,
        "comprimento": 61.13,
        "largura": 18,
        "fabricante": "Dell",
        "fornecedor": "Dell",
        "subCategoria": "Monitores Workstation",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765647801_17c4cde172_n.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53765976719_f29b640a51_n.jpg",
          "https://live.staticflickr.com/65535/53765840598_231a7412ae.jpg",
          "https://live.staticflickr.com/65535/53765976714_4da73b431d.jpg"
        ]
      },
      {
        "nome": "HP DreamColor Z27x G3 27\" 4K HDR Monitor",
        "descricao": "Monitor profissional de 27 polegadas com resolução 4K UHD (3840x2160), tecnologia DreamColor para reprodução de cores precisa, e suporte HDR para imagens mais vivas e detalhadas.",
        "cor": "Preto",
        "valor": 4899.90,
        "modelo": "Z27x G3",
        "peso": 9.5,
        "altura": 44.36,
        "comprimento": 63.8,
        "largura": 23.5,
        "fabricante": "HP",
        "fornecedor": "HP",
        "subCategoria": "Monitores Workstation",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765848743_2dd0d63ae0_n.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53765656191_9ab6a8edc0_n.jpg",
          "https://live.staticflickr.com/65535/53765656186_0dc4138749_n.jpg",
          "https://live.staticflickr.com/65535/53765984999_92bcd4ea0d_n.jpg"
        ]
      },
      {
        "nome": "LG UltraFine 5K Display 27MD5KL-B 27\"",
        "descricao": "Monitor profissional de 27 polegadas com resolução 5K (5120x2880), conectividade Thunderbolt 3 para transferência de dados rápida e suporte para carregamento de laptop.",
        "cor": "Cinza Espacial",
        "valor": 7999.00,
        "modelo": "27MD5KL-B",
        "peso": 8.8,
        "altura": 49.3,
        "comprimento": 65.8,
        "largura": 22.8,
        "fabricante": "LG",
        "fornecedor": "Girafa",
        "subCategoria": "Monitores Workstation",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765659201_18dc055aee_n.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53766072280_cbe7940d83_n.jpg",
          "https://live.staticflickr.com/65535/53766072275_072826c63b_n.jpg",
          "https://live.staticflickr.com/65535/53765984999_92bcd4ea0d_n.jpg"
        ]
      },
      {
        "nome": "BenQ SW271C 27\" 4K UHD PhotoVue Photographer Monitor",
        "descricao": "Monitor profissional de 27 polegadas com resolução 4K UHD (3840x2160), calibrado individualmente com tecnologia HDR e suporte para 99% da gama de cores Adobe RGB.",
        "cor": "Preto",
        "valor": 6999.90,
        "modelo": "SW271C",
        "peso": 8.5,
        "altura": 58.7,
        "comprimento": 67.4,
        "largura": 21.3,
        "fabricante": "BenQ",
        "fornecedor": "Pichau",
        "subCategoria": "Monitores Workstation",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53766075315_9680d2f31c_n.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53765662391_36566e3eec_w.jpg",
          "https://live.staticflickr.com/65535/53766075320_d4edd4b8bf_n.jpg",
          "https://live.staticflickr.com/65535/53765855138_2f365f3043_n.jpg"
        ]
      },
      {
        "nome": "Eizo ColorEdge CG319X 31\" 4K UHD HDR Monitor",
        "descricao": "Monitor profissional de 31 polegadas com resolução 4K UHD (4096x2160), calibrado individualmente com tecnologia HDR, suporte para 98% da gama de cores DCI-P3 e Delta-E menor que 1.",
        "cor": "Preto",
        "valor": 19999.90,
        "modelo": "CG319X",
        "peso": 16.2,
        "altura": 51.2,
        "comprimento": 78.2,
        "largura": 24.8,
        "fabricante": "Eizo",
        "fornecedor": "Pichau",
        "subCategoria": "Monitores Workstation",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53764754327_059f833bf1_w.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53764754322_e8b324eb74_n.jpg",
          "https://live.staticflickr.com/65535/53765664626_1e050f8efa_n.jpg",
          "https://live.staticflickr.com/65535/53765857118_70e205021a_w.jpg"
        ]
      },
      {
        "nome": "Notebook Acer Aspire 5, 256GB, Tela 15/6",
        "descricao": "Processador Intel Core i5-12450H da 12ª Geração com 8 núcleos Tela 15.6” LED com resolução Full HD",
        "cor": "Cinza",
        "valor": 2.599,
        "modelo": "Aspire 5",
        "peso": 2.05,
        "altura": 1.8,
        "comprimento": 34.44,
        "largura": 23.01,
        "fabricante": "ACER",
        "fornecedor": "Acer",
        "subCategoria": "Notebooks",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53772048040_5d8049ae3d_w.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53772048045_575bfb5e61_w.jpg",
          "https://live.staticflickr.com/65535/53771955729_952f28c816_w.jpg",
          "https://live.staticflickr.com/65535/53771621186_e8bbde0460_w.jpg"
        ]
      },
      {
        "nome": "Apple MacBook Pro 13\"",
        "descricao": "Notebook da Apple com tela Retina de 13 polegadas, processador Apple M1, 8GB de RAM, 256GB de armazenamento SSD e sistema operacional macOS.",
        "cor": "Cinza Espacial",
        "valor": 10999.90,
        "modelo": "MacBook Pro 13\"",
        "peso": 1.4,
        "altura": 1.56,
        "comprimento": 30.41,
        "largura": 21.24,
        "fabricante": "Apple",
        "fornecedor": "Apple Brasil",
        "subCategoria": "Notebooks",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765671671_2dda750d3a_z.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53766084180_3814b1854e_z.jpg",
          "https://live.staticflickr.com/65535/53764761322_aed541ef35_n.jpg",
          "https://live.staticflickr.com/65535/53765863658_b9eaf8373a_n.jpg"
        ]
      },
      {
        "nome": "Lenovo ThinkPad X1 Carbon Gen 9",
        "descricao": "Notebook corporativo ultraleve com tela de 14 polegadas, processador Intel Core i7 de décima geração, 16GB de RAM, 512GB de armazenamento SSD e autonomia de bateria de até 19 horas.",
        "cor": "Preto",
        "valor": 12499.90,
        "modelo": "ThinkPad X1 Carbon Gen 9",
        "peso": 1.13,
        "altura": 1.49,
        "comprimento": 32.3,
        "largura": 21.8,
        "fabricante": "Lenovo",
        "fornecedor": "Lenovo",
        "subCategoria": "Notebooks",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765867243_f9c420875c.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53764765062_2931394355_n.jpg",
          "https://live.staticflickr.com/65535/53766088045_7a9bb25b37_z.jpg",
          "https://live.staticflickr.com/65535/53766088030_4fda77ccff_z.jpg"
        ]
      },
      {
        "nome": "Asus ROG Zephyrus G15",
        "descricao": "Notebook gamer com tela de 14 polegadas, processador AMD Ryzen 9 5900HS, 16GB de RAM, 1TB de armazenamento SSD, placa de vídeo NVIDIA GeForce RTX 3060 e sistema operacional Windows 10.",
        "cor": "Cinza",
        "valor": 11999.90,
        "modelo": "ROG Zephyrus G14",
        "peso": 1.7,
        "altura": 1.79,
        "comprimento": 32.4,
        "largura": 22.2,
        "fabricante": "Asus",
        "fornecedor": "ASUS Brasil",
        "subCategoria": "Notebooks",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765678111_744257651c_z.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53766090740_a24403e4d5_z.jpg",
          "https://live.staticflickr.com/65535/53766005944_7187d512c6_n.jpg",
          "https://live.staticflickr.com/65535/53764767947_bb3608d3c0_n.jpg"
        ]
      },
      {
        "nome": "HP Spectre x360 14",
        "descricao": "Notebook 2 em 1 com tela de 14 polegadas OLED, processador Intel Core i7 de décima primeira geração, 16GB de RAM, 1TB de armazenamento SSD e autonomia de bateria de até 17 horas.",
        "cor": "Preto",
        "valor": 13999.90,
        "modelo": "Spectre x360 14\"",
        "peso": 1.34,
        "altura": 1.69,
        "comprimento": 29.8,
        "largura": 22.0,
        "fabricante": "HP",
        "fornecedor": "HP",
        "subCategoria": "Notebooks",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765873028_b3efba84f9_z.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53766008849_280791761b_z.jpg",
          "https://live.staticflickr.com/65535/53766093580_46125a72e8_w.jpg",
          "https://live.staticflickr.com/65535/53765873038_aa8d874431_n.jpg"
        ]
      },
      {
        "nome": "Samsung Galaxy S21 Ultra",
        "descricao": "Smartphone topo de linha da Samsung com tela de 6.8 polegadas, processador Exynos 2100, 12GB de RAM, 256GB de armazenamento, câmera traseira de 108MP e bateria de 5.000mAh.",
        "cor": "Preto",
        "valor": 7999.90,
        "modelo": "Galaxy S21 Ultra",
        "peso": 0.227,
        "altura": 16.51,
        "comprimento": 7.56,
        "largura": 0.89,
        "fabricante": "Samsung",
        "fornecedor": "Samsung Brasil",
        "subCategoria": "Smartphones",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53766012449_1596288d41_n.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53765684596_8f49e77d6f_n.jpg",
          "https://live.staticflickr.com/65535/53766097060_d295d8178d_n.jpg",
          "https://live.staticflickr.com/65535/53765876918_f2b207f767_n.jpg"
        ]
      },
      {
        "nome": "Apple iPhone 13 Pro Max",
        "descricao": "Smartphone premium da Apple com tela de 6.7 polegadas, processador A15 Bionic, 6GB de RAM, 128GB de armazenamento, câmera traseira de 12MP e bateria de 4.352mAh.",
        "cor": "Prata",
        "valor": 9999.90,
        "modelo": "iPhone 13 Pro Max",
        "peso": 0.238,
        "altura": 16.08,
        "comprimento": 7.81,
        "largura": 0.765,
        "fabricante": "Apple",
        "fornecedor": "Apple Brasil",
        "subCategoria": "Smartphones",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765879708_1bdcf26287_w.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53765879718_020e252c76_w.jpg",
          "https://live.staticflickr.com/65535/53765879713_95d1148ba0_n.jpg",
          "https://live.staticflickr.com/65535/53765687621_b7051de73f_n.jpg"
        ]
      },
      {
        "nome": "OnePlus 9 Pro",
        "descricao": "Smartphone da OnePlus com tela de 6.7 polegadas, processador Snapdragon 888, 12GB de RAM, 256GB de armazenamento, câmera traseira de 48MP e bateria de 4.500mAh.",
        "cor": "Verde",
        "valor": 6499.90,
        "modelo": "9 Pro",
        "peso": 0.197,
        "altura": 16.32,
        "comprimento": 7.36,
        "largura": 0.87,
        "fabricante": "OnePlus",
        "fornecedor": "Mega Mamute",
        "subCategoria": "Smartphones",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765693171_9cb89e51e3_z.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53764783442_130869bd80_z.jpg",
          "https://live.staticflickr.com/65535/53765885793_e6eedeb37c_z.jpg",
          "https://live.staticflickr.com/65535/53766106165_00fe838a32_z.jpg"
        ]
      },
      {
        "nome": "Xiaomi Mi 11 Ultra",
        "descricao": "Smartphone da Xiaomi com tela de 6.81 polegadas, processador Snapdragon 888, 12GB de RAM, 256GB de armazenamento, câmera traseira de 50MP e bateria de 5.000mAh.",
        "cor": "Preto",
        "valor": 6999.90,
        "modelo": "Mi 11 Ultra",
        "peso": 0.234,
        "altura": 16.43,
        "comprimento": 7.46,
        "largura": 0.838,
        "fabricante": "Xiaomi",
        "fornecedor": "Xiaomi Brasil",
        "subCategoria": "Smartphones",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53764786507_d4064f66eb_n.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53766024149_83ea1bcc17_n.jpg",
          "https://live.staticflickr.com/65535/53766111690_1fd1156ffb_m.jpg",
          "https://live.staticflickr.com/65535/53766027249_02251d6494_m.jpg"
        ]
      },
      {
        "nome": "Google Pixel 6 Pro",
        "descricao": "Smartphone do Google com tela de 6.71 polegadas, processador Google Tensor, 12GB de RAM, 256GB de armazenamento, câmera traseira de 50MP e bateria de 5.003mAh.",
        "cor": "Cinza",
        "valor": 8499.90,
        "modelo": "Pixel 6 Pro",
        "peso": 0.21,
        "altura": 16.39,
        "comprimento": 7.59,
        "largura": 0.89,
        "fabricante": "Google",
        "fornecedor": "Google Store",
        "subCategoria": "Smartphones",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765894203_24426d3c13_m.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53765702436_e0997a181d_m.jpg",
          "https://live.staticflickr.com/65535/53764792137_7605001be5_n.jpg",
          "https://live.staticflickr.com/65535/53766029739_caa193043f_m.jpg"
        ]
      },
      {
        "nome": "Apple iPad Air (2020)",
        "descricao": "Tablet da Apple com tela Retina de 10.9 polegadas, chip A14 Bionic, 64GB de armazenamento, Wi-Fi, câmera traseira de 12MP e suporte ao Apple Pencil (2ª geração).",
        "cor": "Prateado",
        "valor": 4499.90,
        "modelo": "iPad Air (2020)",
        "peso": 0.458,
        "altura": 24.76,
        "comprimento": 17.85,
        "largura": 0.61,
        "fabricante": "Apple",
        "fornecedor": "Apple Brasil",
        "subCategoria": "Tablets",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53766032544_2657953bc5.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53765897013_d814e3ee8e.jpg",
          "https://live.staticflickr.com/65535/53765704406_804ee9e06f_z.jpg",
          "https://live.staticflickr.com/65535/53764794922_b41028ecd2_w.jpg"
        ]
      },
      {
        "nome": "Samsung Galaxy Tab S7+",
        "descricao": "Tablet premium da Samsung com tela Super AMOLED de 12.4 polegadas, processador Snapdragon 865+, 256GB de armazenamento, S Pen inclusa, 5G e câmera traseira dupla de 13MP + 5MP.",
        "cor": "Preto",
        "valor": 5999.90,
        "modelo": "Galaxy Tab S7+",
        "peso": 0.575,
        "altura": 28.5,
        "comprimento": 18.5,
        "largura": 0.57,
        "fabricante": "Samsung",
        "fornecedor": "Samsung Brasil",
        "subCategoria": "Tablets",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765706196_730d418ef0.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53766118905_bb767ff7a1.jpg",
          "https://live.staticflickr.com/65535/53764796832_091acff84b_z.jpg",
          "https://live.staticflickr.com/65535/53765898858_1f8fa601af_w.jpg"
        ]
      },
      {
        "nome": "Microsoft Surface Pro 7",
        "descricao": "Tablet 2 em 1 da Microsoft com tela PixelSense de 12.3 polegadas, processador Intel Core i5, 8GB de RAM, 256GB de SSD, Windows 10 e suporte ao Surface Pen.",
        "cor": "Platina",
        "valor": 7299.90,
        "modelo": "Surface Pro 7",
        "peso": 0.775,
        "altura": 29.2,
        "comprimento": 20.1,
        "largura": 0.85,
        "fabricante": "Microsoft",
        "fornecedor": "Microsoft Brasil",
        "subCategoria": "Tablets",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765711811_2a25cb440b_z.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53765711796_aab021f6d0_n.jpg",
          "https://live.staticflickr.com/65535/53766040259_35946d3fdf_m.jpg",
          "https://live.staticflickr.com/65535/53765711806_ded460f169_m.jpg"
        ]
      },
      {
        "nome": "Lenovo Tab P11 Pro",
        "descricao": "Tablet da Lenovo com tela OLED de 11.5 polegadas, processador Snapdragon 730G, 6GB de RAM, 128GB de armazenamento, câmera traseira de 13MP e bateria de 8.600mAh.",
        "cor": "Cinza",
        "valor": 3199.90,
        "modelo": "Tab P11 Pro",
        "peso": 0.485,
        "altura": 26.3,
        "comprimento": 17.14,
        "largura": 0.69,
        "fabricante": "Lenovo",
        "fornecedor": "Lenovo",
        "subCategoria": "Tablets",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53766044384_f4e2234606_n.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53765715786_d7aaffefe2_n.jpg",
          "https://live.staticflickr.com/65535/53766128265_5e6c83ff4f_n.jpg",
          "https://live.staticflickr.com/65535/53766044374_588434aff0_n.jpg"
        ]
      },
      {
        "nome": "Huawei MatePad Pro",
        "descricao": "Tablet da Huawei com tela OLED de 10.8 polegadas, processador Kirin 990, 6GB de RAM, 128GB de armazenamento, câmera traseira de 13MP e bateria de 7.250mAh.",
        "cor": "Branco",
        "valor": 3899.90,
        "modelo": "MatePad Pro",
        "peso": 0.46,
        "altura": 24.6,
        "comprimento": 15.9,
        "largura": 0.72,
        "fabricante": "Huawei",
        "fornecedor": "Amazon Brasil",
        "subCategoria": "Tablets",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53766042109_31c9de22dc_n.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53765713621_ddec390e9a_n.jpg",
          "https://live.staticflickr.com/65535/53766042114_95de7bac7f_n.jpg",
          "https://live.staticflickr.com/65535/53766042104_84ea61ff20_w.jpg"
        ]
      },
      {
        "nome": "JBL Charge 5",
        "descricao": "Caixa de som portátil da JBL com Bluetooth, resistência à água (IP67), bateria com até 20 horas de reprodução, JBL PartyBoost para conectar múltiplas caixas e powerbank integrado para carregar dispositivos.",
        "cor": "Preto",
        "valor": 1199.90,
        "modelo": "Charge 5",
        "peso": 0.96,
        "altura": 22.3,
        "comprimento": 9.4,
        "largura": 9.4,
        "fabricante": "JBL",
        "fornecedor": "Pichau",
        "subCategoria": "Caixa de Som",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53766130820_065748f7c2_z.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53764808787_9e27a26a2b_w.jpg",
          "https://live.staticflickr.com/65535/53765718351_5322a3a8b0_w.jpg",
          "https://live.staticflickr.com/65535/53765910763_f7835a4c09_w.jpg"
        ]
      },
      {
        "nome": "Sony XB33",
        "descricao": "Caixa de som portátil da Sony com tecnologia Extra Bass, Bluetooth, resistência à água (IP67), bateria com até 24 horas de reprodução, luzes de festa e função Party Connect para conectar até 100 caixas simultaneamente.",
        "cor": "Azul",
        "valor": 999.90,
        "modelo": "XB33",
        "peso": 1.1,
        "altura": 9.7,
        "comprimento": 24.6,
        "largura": 10.6,
        "fabricante": "Sony",
        "fornecedor": "Sony Brasil",
        "subCategoria": "Caixa de Som",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765913363_be118977a6_n.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53765720866_c07eaeab29_n.jpg",
          "https://live.staticflickr.com/65535/53764811377_6ec155094c_n.jpg",
          "https://live.staticflickr.com/65535/53766049264_dc1ff0d002_n.jpg"
        ]
      },
      {
        "nome": "Bose SoundLink Revolve+",
        "descricao": "Caixa de som Bluetooth da Bose com som de 360 graus, resistência à água (IPX4), bateria com até 17 horas de reprodução, microfone integrado para chamadas e assistente de voz.",
        "cor": "Prata",
        "valor": 1599.90,
        "modelo": "SoundLink Revolve+",
        "peso": 0.9,
        "altura": 18.4,
        "comprimento": 10.5,
        "largura": 10.5,
        "fabricante": "Bose",
        "fornecedor": "Home Automation Experts Ltda",
        "subCategoria": "Caixa de Som",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53766051229_214a6b20e1_n.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53766135540_447b296640_n.jpg",
          "https://live.staticflickr.com/65535/53765915143_3363f5b9e8_n.jpg",
          "https://live.staticflickr.com/65535/53765722721_12b594a62c_w.jpg"
        ]
      },
      {
        "nome": "Ultimate Ears Wonderboom 2",
        "descricao": "Caixa de som Bluetooth da Ultimate Ears com som surpreendentemente alto, design à prova d'água e flutuante, bateria com até 13 horas de reprodução e função Outdoor Boost para aumentar o volume em ambientes abertos.",
        "cor": "Vermelho",
        "valor": 599.90,
        "modelo": "Wonderboom 2",
        "peso": 0.42,
        "altura": 10.4,
        "comprimento": 9.35,
        "largura": 9.35,
        "fabricante": "Ultimate Ears",
        "fornecedor": "Home Automation Experts Ltda",
        "subCategoria": "Caixa de Som",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53764815822_016fe6819e_w.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53766053594_126d3044ae_w.jpg",
          "https://live.staticflickr.com/65535/53766137660_35c463cfaa_w.jpg",
          "https://live.staticflickr.com/65535/53765917828_4a7be4460f_w.jpg"
        ]
      },
      {
        "nome": "Marshall Emberton",
        "descricao": "Caixa de som portátil da Marshall com design compacto e resistente, Bluetooth 5.0, bateria com até 20 horas de reprodução, certificação IPX7 contra água e poeira, e carregamento rápido via USB-C.",
        "cor": "Preto",
        "valor": 899.90,
        "modelo": "Emberton",
        "peso": 0.7,
        "altura": 16,
        "comprimento": 16,
        "largura": 7.6,
        "fabricante": "Marshall",
        "fornecedor": "Home Automation Experts Ltda",
        "subCategoria": "Caixa de Som",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765919668_accc1dfd23_n.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53764817712_60fb99ed7c_n.jpg",
          "https://live.staticflickr.com/65535/53764817707_167e80bd55_n.jpg",
          "https://live.staticflickr.com/65535/53766139560_300ef1103c_n.jpg"
        ]
      },
      {
        "nome": "Apple AirPods Pro",
        "descricao": "Fone de ouvido sem fio da Apple com cancelamento ativo de ruído, modo de transparência, resistência à água e suor (IPX4), até 24 horas de duração da bateria com estojo de recarga, e qualidade de som superior.",
        "cor": "Branco",
        "valor": 1799.00,
        "modelo": "AirPods Pro",
        "peso": 0.0054,
        "altura": 3.09,
        "comprimento": 2.18,
        "largura": 2.4,
        "fabricante": "Apple",
        "fornecedor": "Apple Brasil",
        "subCategoria": "Fone de Ouvido",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53766146890_f87252c702_w.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53765734791_8f106d4fca_w.jpg",
          "https://live.staticflickr.com/65535/53766146895_eb930371eb_z.jpg",
          "https://live.staticflickr.com/65535/53766063004_b8ea1325d7_z.jpg"
        ]
      },
      {
        "nome": "Headphone over-ear Bluetooth WB Siren Pro ANC",
        "descricao": "Fone de ouvido sem fio da SOULWIT com cancelamento de ruído adaptável, controle por voz, até 30 horas de autonomia da bateria, conexão multiponto, e qualidade de som premium com tecnologia LDAC.",
        "cor": "Preto",
        "valor": 309.09,
        "modelo": "WH-1000XM4",
        "peso": 0.254,
        "altura": 2.35,
        "comprimento": 19.4,
        "largura": 17,
        "fabricante": "SOULWIT",
        "fornecedor": "Pichau",
        "subCategoria": "Fone de Ouvido",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53771554776_58e3384bdc_c.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53770641627_a3cb55806c_w.jpg",
          "https://live.staticflickr.com/65535/53771882974_c293e64026.jpg",
          "https://live.staticflickr.com/65535/53771757688_c0fe44c5e2_w.jpg"
        ]
      },
      {
        "nome": "JBL Tune 500BT",
        "descricao": "Fone de ouvido Bluetooth da JBL com design leve e dobrável, até 16 horas de autonomia da bateria, conexão multiponto, chamadas de viva-voz e qualidade de som JBL Pure Bass.",
        "cor": "Preto",
        "valor": 239.00,
        "modelo": "Tune 500BT",
        "peso": 0.155,
        "altura": 18.67,
        "comprimento": 17.87,
        "largura": 5.5,
        "fabricante": "JBL",
        "fornecedor": "Kabum",
        "subCategoria": "Fone de Ouvido",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53764828127_651e9b0aba_w.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53766150090_2ced98f450_w.jpg",
          "https://live.staticflickr.com/65535/53765930408_b07e43a45f_w.jpg",
          "https://live.staticflickr.com/65535/53764828122_92e3e6f6fb.jpg"
        ]
      },
      {
        "nome": "Samsung Galaxy Buds Pro",
        "descricao": "Fone de ouvido sem fio da Samsung com cancelamento de ruído ativo, áudio espacial 360, até 28 horas de duração da bateria com estojo de recarga, resistência à água (IPX7) e controle por gestos.",
        "cor": "Prata",
        "valor": 1499.00,
        "modelo": "Galaxy Buds Pro",
        "peso": 0.0063,
        "altura": 1.95,
        "comprimento": 2.05,
        "largura": 2.08,
        "fabricante": "Samsung",
        "fornecedor": "Samsung Brasil",
        "subCategoria": "Fone de Ouvido",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765739941_8ca0443d4d.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53766152000_d983310163.jpg",
          "https://live.staticflickr.com/65535/53764830092_4581ef1568_w.jpg",
          "https://live.staticflickr.com/65535/53764830097_195fb61b34_n.jpg"
        ]
      },
      {
        "nome": "Earbuds Basic Global Mi True Wireless",
        "descricao": "Fone de ouvido sem fio da Wireless com cancelamento de ruído ajustável, ajuste seguro e confortável, até 6 horas de autonomia da bateria, resistência à água (IPX4) e controles táteis.",
        "cor": "Preto",
        "valor": 259.99,
        "modelo": "QuietComfort Earbuds",
        "peso": 0.0085,
        "altura": 3.2,
        "comprimento": 5.5,
        "largura": 2.5,
        "fabricante": "Bose",
        "fornecedor": "Amazon Brasil",
        "subCategoria": "Fone de Ouvido",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53770742752_3a45b55703_c.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53772073060_8d8942b699.jpg",
          "https://live.staticflickr.com/65535/53772073080_9ca50284d7_w.jpg",
          "https://live.staticflickr.com/65535/53771856068_4fb3fa2a02.jpg"
        ]
      },
      {
        "nome": "HyperX QuadCast",
        "descricao": "Microfone condensador USB com suporte de choque integrado, filtro pop interno, padrão polar cardioide e LED indicador de status. Projetado para streaming, podcasting e jogos, oferecendo áudio de alta qualidade e controle de ganho ajustável.",
        "cor": "Vermelho e preto",
        "valor": 999.00,
        "modelo": "QuadCast",
        "peso": 0.254,
        "altura": 13.6,
        "comprimento": 8.3,
        "largura": 8.3,
        "fabricante": "HyperX",
        "fornecedor": "Mega Mamute",
        "subCategoria": "Microfone",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53766071674_1351ab128f_n.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53765935918_3edfa6f79b_n.jpg",
          "https://live.staticflickr.com/65535/53765743536_c66a6b51a2_n.jpg",
          "https://live.staticflickr.com/65535/53765743531_452dea4626_n.jpg"
        ]
      },
      {
        "nome": "Razer Seiren X",
        "descricao": "Microfone condensador supercardioide compacto e portátil, ideal para streaming, podcasts e gravações de voz. Oferece reprodução de áudio nítida e clara, padrão polar supercardioide para redução de ruído ambiente e suporte de choque integrado.",
        "cor": "Preto",
        "valor": 799.00,
        "modelo": "Seiren X",
        "peso": 0.354,
        "altura": 17.1,
        "comprimento": 7.5,
        "largura": 7.5,
        "fabricante": "Razer",
        "fornecedor": "Advanced Home Solutions Ltda",
        "subCategoria": "Microfone",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53766158655_4a0edc6c3d.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53765938893_73054f61c0.jpg",
          "https://live.staticflickr.com/65535/53766074609_4e23edfacb_n.jpg",
          "https://live.staticflickr.com/65535/53766158670_33dbc66e98_n.jpg"
        ]
      },
      {
        "nome": "Blue Yeti X",
        "descricao": "Microfone condensador USB premium com quatro cápsulas de condensador e padrões de captação ajustáveis (cardioide, bidirecional, omnidirecional e estéreo). Possui indicadores LED, controle de ganho, filtro de ruído e software de personalização via PC.",
        "cor": "Preto",
        "valor": 1299.00,
        "modelo": "Yeti X",
        "peso": 0.63,
        "altura": 28.4,
        "comprimento": 12.9,
        "largura": 12.9,
        "fabricante": "Blue",
        "fornecedor": "Advanced Home Solutions Ltda",
        "subCategoria": "Microfone",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53766161485_90ccb00692_n.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53764839502_5e965abd9b_n.jpg",
          "https://live.staticflickr.com/65535/53766161490_6e74c662bb_n.jpg",
          "https://live.staticflickr.com/65535/53766161495_996c177434_n.jpg"
        ]
      },
      {
        "nome": "Elgato Wave:3",
        "descricao": "Microfone condensador USB com tecnologia de condensador de diafragma largo, padrão polar cardioide, filtro de ruído digital e controle de mixagem em tempo real. Projetado para streaming, podcasting e gravações profissionais, oferecendo áudio cristalino e personalização avançada.",
        "cor": "Preto",
        "valor": 1199.00,
        "modelo": "Wave:3",
        "peso": 0.5,
        "altura": 24,
        "comprimento": 14,
        "largura": 14,
        "fabricante": "Elgato",
        "fornecedor": "Balão da Informática",
        "subCategoria": "Microfone",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53766165235_123f611283_n.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53764843212_b078311f0b_n.jpg",
          "https://live.staticflickr.com/65535/53765752846_678562b07d_n.jpg",
          "https://live.staticflickr.com/65535/53765752851_f12a9c41d8_n.jpg"
        ]
      },
      {
        "nome": "Trust GXT 252+ Emita",
        "descricao": "Microfone de estúdio USB com iluminação LED RGB, padrão polar cardioide, filtro pop integrado e suporte de choque antivibração. Ideal para streaming, podcasting e jogos, oferecendo qualidade de áudio profissional e design exclusivo.",
        "cor": "Preto",
        "valor": 399.00,
        "modelo": "GXT 252+ Emita",
        "peso": 0.44,
        "altura": 19,
        "comprimento": 13,
        "largura": 13,
        "fabricante": "Trust",
        "fornecedor": "Amazon Brasil",
        "subCategoria": "Microfone",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53766082679_d95ed463c4_w.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53766082689_508911b2eb_w.jpg",
          "https://live.staticflickr.com/65535/53766082684_0876576c71_n.jpg",
          "https://live.staticflickr.com/65535/53765947058_5138858f1c_n.jpg"
        ]
      },
      {
        "nome": "HyperX QuadCast",
        "descricao": "Microfone condensador USB com suporte de choque integrado, filtro pop interno, padrão polar cardioide e LED indicador de status. Projetado para streaming, podcasting e jogos, oferecendo áudio de alta qualidade e controle de ganho ajustável.",
        "cor": "Vermelho e preto",
        "valor": 999.00,
        "modelo": "QuadCast",
        "peso": 0.254,
        "altura": 13.6,
        "comprimento": 8.3,
        "largura": 8.3,
        "fabricante": "HyperX",
        "fornecedor": "Mega Mamute",
        "subCategoria": "Microfone",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53766071674_1351ab128f_n.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53765935918_3edfa6f79b_n.jpg",
          "https://live.staticflickr.com/65535/53765743536_c66a6b51a2_n.jpg",
          "https://live.staticflickr.com/65535/53765743531_452dea4626_n.jpg"
        ]
      },
      {
        "nome": "Razer Seiren X",
        "descricao": "Microfone condensador supercardioide compacto e portátil, ideal para streaming, podcasts e gravações de voz. Oferece reprodução de áudio nítida e clara, padrão polar supercardioide para redução de ruído ambiente e suporte de choque integrado.",
        "cor": "Preto",
        "valor": 799.00,
        "modelo": "Seiren X",
        "peso": 0.354,
        "altura": 17.1,
        "comprimento": 7.5,
        "largura": 7.5,
        "fabricante": "Razer",
        "fornecedor": "Advanced Home Solutions Ltda",
        "subCategoria": "Microfone",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53766158655_4a0edc6c3d.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53765938893_73054f61c0.jpg",
          "https://live.staticflickr.com/65535/53766074609_4e23edfacb_n.jpg",
          "https://live.staticflickr.com/65535/53766158670_33dbc66e98_n.jpg"
        ]
      },
      {
        "nome": "Blue Yeti X",
        "descricao": "Microfone condensador USB premium com quatro cápsulas de condensador e padrões de captação ajustáveis (cardioide, bidirecional, omnidirecional e estéreo). Possui indicadores LED, controle de ganho, filtro de ruído e software de personalização via PC.",
        "cor": "Preto",
        "valor": 1299.00,
        "modelo": "Yeti X",
        "peso": 0.63,
        "altura": 28.4,
        "comprimento": 12.9,
        "largura": 12.9,
        "fabricante": "Blue",
        "fornecedor": "Advanced Home Solutions Ltda",
        "subCategoria": "Microfone",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53766161485_90ccb00692_n.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53764839502_5e965abd9b_n.jpg",
          "https://live.staticflickr.com/65535/53766161490_6e74c662bb_n.jpg",
          "https://live.staticflickr.com/65535/53766161495_996c177434_n.jpg"
        ]
      },
      {
        "nome": "Elgato Wave:3",
        "descricao": "Microfone condensador USB com tecnologia de condensador de diafragma largo, padrão polar cardioide, filtro de ruído digital e controle de mixagem em tempo real. Projetado para streaming, podcasting e gravações profissionais, oferecendo áudio cristalino e personalização avançada.",
        "cor": "Preto",
        "valor": 1199.00,
        "modelo": "Wave:3",
        "peso": 0.5,
        "altura": 24,
        "comprimento": 14,
        "largura": 14,
        "fabricante": "Elgato",
        "fornecedor": "Balão da Informática",
        "subCategoria": "Microfone",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53766165235_123f611283_n.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53764843212_b078311f0b_n.jpg",
          "https://live.staticflickr.com/65535/53765752846_678562b07d_n.jpg",
          "https://live.staticflickr.com/65535/53765752851_f12a9c41d8_n.jpg"
        ]
      },
      {
        "nome": "Trust GXT 252+ Emita",
        "descricao": "Microfone de estúdio USB com iluminação LED RGB, padrão polar cardioide, filtro pop integrado e suporte de choque antivibração. Ideal para streaming, podcasting e jogos, oferecendo qualidade de áudio profissional e design exclusivo.",
        "cor": "Preto",
        "valor": 399.00,
        "modelo": "GXT 252+ Emita",
        "peso": 0.44,
        "altura": 19,
        "comprimento": 13,
        "largura": 13,
        "fabricante": "Trust",
        "fornecedor": "Amazon Brasil",
        "subCategoria": "Microfone",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53766082679_d95ed463c4_w.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53766082689_508911b2eb_w.jpg",
          "https://live.staticflickr.com/65535/53766082684_0876576c71_n.jpg",
          "https://live.staticflickr.com/65535/53765947058_5138858f1c_n.jpg"
        ]
      },
      {
        "nome": "Logitech G502 Hero",
        "descricao": "Mouse para jogos com sensor HERO 16K, 11 botões programáveis, ajuste de peso e iluminação RGB personalizável. Oferece precisão excepcional, conforto ergonômico e desempenho personalizável para jogadores.",
        "cor": "Preto",
        "valor": 399.00,
        "modelo": "G502 Hero",
        "peso": 0.121,
        "altura": 13.2,
        "comprimento": 7.5,
        "largura": 4,
        "fabricante": "Logitech",
        "fornecedor": "Kabum",
        "desconto": "20",
        "subCategoria": "Mouse",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53766084959_94c6452540_z.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53766169180_40deea5dc5_n.jpg",
          "https://live.staticflickr.com/65535/53765756606_1637ae1426_n.jpg",
          "https://live.staticflickr.com/65535/53766084964_3a2368f3a7_w.jpg"
        ]
      },
      {
        "nome": "Razer DeathAdder V2",
        "descricao": "Mouse para jogos com sensor óptico Focus+ de 20.000 DPI, switches ópticos Razer, design ergonômico para destros, 8 botões programáveis e iluminação RGB Chroma. Oferece precisão, velocidade e conforto para jogadores exigentes.",
        "cor": "Preto",
        "valor": 449.00,
        "modelo": "DeathAdder V2",
        "peso": 0.082,
        "altura": 12.7,
        "comprimento": 7,
        "largura": 4.4,
        "fabricante": "Razer",
        "fornecedor": "Home Automation Experts Ltda",
        "subCategoria": "Mouse",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53766086929_d09c165bd9.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53765758411_e0fbfbc482.jpg",
          "https://live.staticflickr.com/65535/53764848702_5fe7cde1fd_n.jpg",
          "https://live.staticflickr.com/65535/53766086924_5ff6c07f5e_n.jpg"
        ]
      },
      {
        "nome": "SteelSeries Rival 3",
        "descricao": "Mouse para jogos com sensor óptico TrueMove Core de 8.500 DPI, 6 botões programáveis, switches mecânicos e iluminação Prism RGB. Projetado para jogadores competitivos, oferecendo precisão, durabilidade e desempenho otimizado.",
        "cor": "Preto",
        "valor": 229.00,
        "modelo": "Rival 3",
        "peso": 0.077,
        "altura": 12.4,
        "comprimento": 6.2,
        "largura": 3.8,
        "fabricante": "SteelSeries",
        "fornecedor": "Eletro Shopping",
        "subCategoria": "Mouse",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53764850372_6a2d328b56.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53766172885_be8eb77600.jpg",
          "https://live.staticflickr.com/65535/53766172880_854aeb8a8c_n.jpg",
          "https://live.staticflickr.com/65535/53764850377_1dc29b1806_n.jpg"
        ]
      },
      {
        "nome": "Corsair Harpoon RGB Wireless",
        "descricao": "Mouse sem fio para jogos com sensor óptico de 10.000 DPI, conexão sem fio Slipstream, design leve e bateria de longa duração. Oferece liberdade de movimento, precisão e conforto para jogadores que preferem uma configuração sem fio.",
        "cor": "Preto",
        "valor": 299.00,
        "modelo": "Harpoon RGB Wireless",
        "peso": 0.099,
        "altura": 11.6,
        "comprimento": 6.8,
        "largura": 3.8,
        "fabricante": "Corsair",
        "fornecedor": "Eletro Shopping",
        "subCategoria": "Mouse",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53764853172_d7edda6282_w.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53766090924_1f09dff778_w.jpg",
          "https://live.staticflickr.com/65535/53766175490_99ea1dfdf1_w.jpg",
          "https://live.staticflickr.com/65535/53766090914_29e7246d56_w.jpg"
        ]
      },
      {
        "nome": "HyperX Pulsefire Surge RGB",
        "descricao": "Mouse para jogos com sensor Pixart 3389 de 16.000 DPI, iluminação RGB personalizável, design ergonômico e switches Omron duráveis. Projetado para oferecer precisão, velocidade e conforto durante longas sessões de jogo.",
        "cor": "Preto",
        "valor": 299.00,
        "modelo": "Pulsefire Surge RGB",
        "peso": 0.1,
        "altura": 12.4,
        "comprimento": 6.7,
        "largura": 4.2,
        "fabricante": "HyperX",
        "fornecedor": "Electronics Emporium",
        "subCategoria": "Mouse",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53764855182_9975c4e371_z.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53764855202_27a0057577_n.jpg",
          "https://live.staticflickr.com/65535/53766092699_dc7a45a850_n.jpg",
          "https://live.staticflickr.com/65535/53766177490_c2be972bbc_w.jpg"
        ]
      },
      {
        "nome": "HyperX Fury S Pro",
        "descricao": "Mousepad com superfície de tecido de alta qualidade, otimizado para rastreamento preciso, base de borracha antiderrapante e bordas costuradas para maior durabilidade. Disponível em várias dimensões para atender diferentes necessidades de espaço.",
        "cor": "Preto",
        "valor": 79.00,
        "modelo": "Fury S Pro",
        "peso": 0.28,
        "altura": 42,
        "comprimento": 36,
        "largura": 0.3,
        "fabricante": "HyperX",
        "fornecedor": "Electronics Emporium",
        "subCategoria": "Mousepad",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765766411_fb718ed87a_n.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53765766421_44cfe2726d_n.jpg",
          "https://live.staticflickr.com/65535/53766094904_df5771381b_z.jpg",
          "https://live.staticflickr.com/65535/53766179490_473270afe1_z.jpg"
        ]
      },
      {
        "nome": "SteelSeries QcK",
        "descricao": "Mousepad com superfície de pano microtecido de alta qualidade, base de borracha antiderrapante e bordas costuradas para maior durabilidade. Proporciona um deslize suave e preciso para o mouse, ideal para jogadores que buscam controle e conforto.",
        "cor": "Preto",
        "valor": 69.00,
        "modelo": "QcK",
        "peso": 0.095,
        "altura": 32,
        "comprimento": 27,
        "largura": 0.2,
        "fabricante": "SteelSeries",
        "fornecedor": "Eletro Shopping",
        "subCategoria": "Mousepad",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53764858907_8a04a7db44_z.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53765767916_8df8b991d7_z.jpg",
          "https://live.staticflickr.com/65535/53765961058_4fe60cb10a_z.jpg",
          "https://live.staticflickr.com/65535/53765767911_e58b290aa4_z.jpg"
        ]
      },
      {
        "nome": "Razer Goliathus Speed",
        "descricao": "Mousepad com superfície de pano texturizada, otimizada para movimentos rápidos e precisos do mouse, base de borracha antiderrapante e bordas cosidas para maior durabilidade. Projetado para jogadores que exigem velocidade e resposta imediata.",
        "cor": "Preto",
        "valor": 99.00,
        "modelo": "Goliathus Speed",
        "peso": 0.2,
        "altura": 30,
        "comprimento": 25,
        "largura": 0.3,
        "fabricante": "Razer",
        "fornecedor": "Cooler Master Brasil",
        "subCategoria": "Mousepad",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53766183110_f51af98d1e_z.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53765963228_f0602cf434_z.jpg",
          "https://live.staticflickr.com/65535/53765963223_e225778215_z.jpg",
          "https://live.staticflickr.com/65535/53766183100_fca45d536b_z.jpg"
        ]
      },
      {
        "nome": "Corsair MM300",
        "descricao": "Mousepad com superfície de tecido de malha anti-desgaste, base de borracha antiderrapante e bordas reforçadas para evitar descamação. Projetado para deslize suave e controle preciso do mouse, oferecendo durabilidade para uso prolongado.",
        "cor": "Preto",
        "valor": 89.00,
        "modelo": "MM300",
        "peso": 0.37,
        "altura": 36,
        "comprimento": 30,
        "largura": 0.3,
        "fabricante": "Corsair",
        "fornecedor": "Universal Electronics Ltda",
        "subCategoria": "Mousepad",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765772571_919ab91a3f_n.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53766100929_7d72a0fca9_n.jpg",
          "https://live.staticflickr.com/65535/53764863617_c03f617906_n.jpg",
          "https://live.staticflickr.com/65535/53766185895_547910de7e_n.jpg"
        ]
      },
      {
        "nome": "Logitech G240",
        "descricao": "Mousepad com superfície de tecido para deslize baixo, base de borracha estável e bordas reforçadas para evitar desgaste. Projetado para oferecer desempenho consistente em todos os níveis de DPI, ideal para jogadores que preferem controle de precisão.",
        "cor": "Preto",
        "valor": 59.00,
        "modelo": "G240",
        "peso": 0.09,
        "altura": 34,
        "comprimento": 28,
        "largura": 0.3,
        "fabricante": "Logitech",
        "fornecedor": "Universal Electronics Ltda",
        "subCategoria": "Mousepad",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53764867002_3ca490c302_w.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53765969248_45faff8e60_n.jpg",
          "https://live.staticflickr.com/65535/53764867007_55988af500_n.jpg",
          "https://live.staticflickr.com/65535/53765969253_ff90def5a1_n.jpg"
        ]
      },
      {
        "nome": "Logitech K380",
        "descricao": "Teclado Bluetooth Multidispositivo compacto e leve, ideal para uso em computadores, tablets e smartphones.",
        "cor": "Preto",
        "valor": 199.90,
        "modelo": "K380",
        "peso": 0.423,
        "altura": 1.6,
        "comprimento": 12.4,
        "largura": 27.9,
        "fabricante": "Logitech",
        "fornecedor": "Amazon Brasil",
        "subCategoria": "Teclado",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53764869747_b81bdfaf8d_z.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53766191545_628c8bf0dd_n.jpg",
          "https://live.staticflickr.com/65535/53764869757_cca71afaba_n.jpg",
          "https://live.staticflickr.com/65535/53766191540_a2f513d0b6_z.jpg"
        ]
      },
      {
        "nome": "Razer BlackWidow Chroma",
        "descricao": "Teclado mecânico para jogos com iluminação RGB personalizável e switches mecânicos Razer.",
        "cor": "Preto",
        "valor": 899.90,
        "modelo": "BlackWidow Chroma",
        "peso": 1.5,
        "altura": 4.1,
        "comprimento": 18.2,
        "largura": 47.5,
        "fabricante": "Razer",
        "fornecedor": "Amazon Brasil",
        "subCategoria": "Teclado",
        "desconto": "13",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53766193515_ab042ce67d_z.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53766193520_4efd26c46c_z.jpg",
          "https://live.staticflickr.com/65535/53764871587_4776c45023.jpg",
          "https://live.staticflickr.com/65535/53766108579_5d9dfdb3d1_z.jpg"
        ]
      },
      {
        "nome": "Microsoft Sculpt Ergonomic Keyboard",
        "descricao": "Teclado ergonômico com layout dividido e design curvado para maior conforto durante o uso prolongado.",
        "cor": "Preto",
        "valor": 459.90,
        "modelo": "Sculpt Ergonomic",
        "peso": 0.998,
        "altura": 5.3,
        "comprimento": 23.1,
        "largura": 39.2,
        "fabricante": "Microsoft",
        "fornecedor": "Microsoft Brasil",
        "subCategoria": "Teclado",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765783641_dc06d1960e_w.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53766111649_e7c0c3ca99_n.jpg",
          "https://live.staticflickr.com/65535/53764874527_b06862246c_n.jpg",
          "https://live.staticflickr.com/65535/53764874532_beda2a7a09_n.jpg"
        ]
      },
      {
        "nome": "Corsair K95 RGB Platinum",
        "descricao": "Teclado mecânico de alto desempenho com iluminação RGB avançada e teclas macro dedicadas.",
        "cor": "Preto",
        "valor": 1299.90,
        "modelo": "K95 RGB Platinum",
        "peso": 1.32,
        "altura": 3.6,
        "comprimento": 16.3,
        "largura": 46.5,
        "fabricante": "Corsair",
        "fornecedor": "Cooler Master Brasil",
        "subCategoria": "Teclado",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53766199495_c5fdc735eb_z.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53766199500_51e94a7b97_n.jpg",
          "https://live.staticflickr.com/65535/53765979513_9952480e63_n.jpg",
          "https://live.staticflickr.com/65535/53765786651_bf3fb58bcd_n.jpg"
        ]
      },
      {
        "nome": "Apple Magic Keyboard",
        "descricao": "Teclado sem fio e recarregável com layout numérico, design fino e elegante, e teclas de baixo perfil.",
        "cor": "Prata",
        "valor": 729.00,
        "modelo": "Magic Keyboard",
        "peso": 0.39,
        "altura": 1.09,
        "comprimento": 11.49,
        "largura": 41.87,
        "fabricante": "Apple",
        "fornecedor": "Apple Brasil",
        "subCategoria": "Teclado",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765798576_ea85815066_z.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53765991598_49babb35d4_z.jpg",
          "https://live.staticflickr.com/65535/53766126749_75b507ed1d_z.jpg",
          "https://live.staticflickr.com/65535/53764889207_4b732a6cec_z.jpg"
        ]
      },
      {
        "nome": "Oculus Quest 2",
        "descricao": "Óculos de realidade virtual com tecnologia avançada, tela de alta resolução, processador integrado e sistema de rastreamento interno. Oferece uma experiência imersiva de RV sem a necessidade de conexão com PC ou cabos externos.",
        "cor": "Branco",
        "valor": 1999.00,
        "modelo": "Quest 2",
        "peso": 0.503,
        "altura": 18.5,
        "comprimento": 16.7,
        "largura": 10.9,
        "fabricante": "Oculus",
        "fornecedor": "Amazon Brasil",
        "subCategoria": "Óculos de VR",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53764891427_da0edb6191_z.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53766213500_2624c96373_z.jpg",
          "https://live.staticflickr.com/65535/53766213485_d9a89cf754_z.jpg",
          "https://live.staticflickr.com/65535/53764891432_576c5e7cc0_z.jpg"
        ]
      },
      {
        "nome": "Sony PlayStation VR",
        "descricao": "Óculos de realidade virtual desenvolvido para uso com o console PlayStation 4, proporcionando uma experiência de RV envolvente com jogos exclusivos, rastreamento preciso e compatibilidade com os controladores do PS4.",
        "cor": "Preto",
        "valor": 1699.00,
        "modelo": "PlayStation VR",
        "peso": 0.61,
        "altura": 18.4,
        "comprimento": 19.9,
        "largura": 27.4,
        "fabricante": "Sony",
        "fornecedor": "Sony Brasil",
        "subCategoria": "Óculos de VR",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53766131304_a4d08397f1_z.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53766131309_943338f9cb_z.jpg",
          "https://live.staticflickr.com/65535/53766131319_fd8950982d_n.jpg",
          "https://live.staticflickr.com/65535/53766131299_b737fe84ea_w.jpg"
        ]
      },
      {
        "nome": "HTC Vive Cosmos",
        "descricao": "Óculos de realidade virtual de alta qualidade, oferecendo uma experiência de RV imersiva com resolução de alta definição, rastreamento preciso e design confortável. Compatível com uma ampla variedade de jogos e aplicativos de RV.",
        "cor": "Preto",
        "valor": 2499.00,
        "modelo": "Vive Cosmos",
        "peso": 0.645,
        "altura": 19.7,
        "comprimento": 17.3,
        "largura": 12.8,
        "fabricante": "HTC",
        "fornecedor": "Universal Electronics Ltda",
        "subCategoria": "Óculos de VR",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765807201_9ae41ea6f4_z.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53766000023_60f5d549f6.jpg",
          "https://live.staticflickr.com/65535/53765807206_6c52d11b8d.jpg",
          "https://live.staticflickr.com/65535/53764897922_67ece17f9b_z.jpg"
        ]
      },
      {
        "nome": "Samsung HMD Odyssey+",
        "descricao": "Óculos de realidade virtual com tela OLED de alta resolução, tecnologia anti-serrilhado, design ergonômico e fones de ouvido integrados. Oferece uma experiência imersiva de RV para jogos e aplicativos de entretenimento.",
        "cor": "Preto",
        "valor": 1999.00,
        "modelo": "HMD Odyssey+",
        "peso": 0.59,
        "altura": 20.3,
        "comprimento": 19.8,
        "largura": 11.6,
        "fabricante": "Samsung",
        "fornecedor": "Samsung Brasil",
        "subCategoria": "Óculos de VR",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765809421_bc317c9a81_n.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53766002428_6f154f693f_z.jpg",
          "https://live.staticflickr.com/65535/53766222225_f034891dca_z.jpg",
          "https://live.staticflickr.com/65535/53766002423_20b53ae22f_z.jpg"
        ]
      },
      {
        "nome": "Lenovo Mirage Solo",
        "descricao": "Óculos de realidade virtual autônomo com tecnologia de rastreamento de seis graus de liberdade, tela de alta definição e design leve e confortável. Permite aos usuários desfrutar de experiências de RV sem a necessidade de um dispositivo externo.",
        "cor": "Branco",
        "valor": 1499.00,
        "modelo": "Mirage Solo",
        "peso": 0.645,
        "altura": 19.7,
        "comprimento": 17.3,
        "largura": 12.8,
        "fabricante": "Lenovo",
        "fornecedor": "Lenovo",
        "subCategoria": "Óculos de VR",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53766004543_e0b35279ae_n.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53766004548_e40d920658_n.jpg",
          "https://live.staticflickr.com/65535/53766004553_44850b46b5_n.jpg",
          "https://live.staticflickr.com/65535/53766224640_43d3fb724c_n.jpg"
        ]
      },
      {
        "nome": "Oculus Touch Controllers",
        "descricao": "Controladores de realidade virtual projetados para serem usados com o Oculus Rift e Oculus Rift S. Oferecem rastreamento preciso, feedback tátil e controle intuitivo para uma experiência imersiva de RV.",
        "cor": "Preto",
        "valor": 399.00,
        "modelo": "Touch",
        "peso": 0.152,
        "altura": 11.7,
        "comprimento": 12.1,
        "largura": 10.7,
        "fabricante": "Oculus",
        "fornecedor": "Girafa",
        "subCategoria": "Periféricos de VR",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53766008768_b9a0e29055_z.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53766143784_d2ec96736e_z.jpg",
          "https://live.staticflickr.com/65535/53764906617_effd911f5e_z.jpg",
          "https://live.staticflickr.com/65535/53766143789_19b4fd28c3_z.jpg"
        ]
      },
      {
        "nome": "HTC Vive Base Stations",
        "descricao": "Estações base de rastreamento para óculos de realidade virtual HTC Vive. Oferecem um rastreamento preciso de 360 graus, permitindo uma experiência de RV sem fio e sem lag.",
        "cor": "Preto",
        "valor": 199.00,
        "modelo": "Base Station",
        "peso": 0.201,
        "altura": 18.8,
        "comprimento": 9.8,
        "largura": 7.7,
        "fabricante": "HTC",
        "fornecedor": "Amazon Brasil",
        "subCategoria": "Periféricos de VR",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765819581_299f6d0d6b_z.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53766147524_296cfbb2c5_z.jpg",
          "https://live.staticflickr.com/65535/53764910352_7fc026221d_z.jpg",
          "https://live.staticflickr.com/65535/53764910357_7c335746e2_n.jpg"
        ]
      },
      {
        "nome": "Sony PlayStation Move Controllers",
        "descricao": "Controladores de movimento para uso com o PlayStation VR. Permitem aos jogadores interagir de forma intuitiva com jogos de realidade virtual, oferecendo rastreamento preciso e feedback tátil.",
        "cor": "Preto",
        "valor": 299.00,
        "modelo": "PlayStation Move",
        "peso": 0.144,
        "altura": 21.2,
        "comprimento": 5.6,
        "largura": 9.3,
        "fabricante": "Sony",
        "fornecedor": "Sony Brasil",
        "subCategoria": "Periféricos de VR",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53766016718_4326610219_w.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53766016723_605fa8054f_w.jpg",
          "https://live.staticflickr.com/65535/53764914457_047b70de12_m.jpg",
          "https://live.staticflickr.com/65535/53764914462_3ac7f74055_m.jpg"
        ]
      },
      {
        "nome": "Lenovo Mirage Camera",
        "descricao": "Câmera de captura de imagens em 3D para uso com óculos de realidade virtual Lenovo Mirage Solo. Permite aos usuários criar conteúdo de RV personalizado e imersivo.",
        "cor": "Branco",
        "valor": 299.00,
        "modelo": "Mirage Camera",
        "peso": 0.139,
        "altura": 10.8,
        "comprimento": 4.5,
        "largura": 9.8,
        "fabricante": "Lenovo",
        "fornecedor": "Lenovo",
        "subCategoria": "Periféricos de VR",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53766171589_18f489be7f_n.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53764935157_b596dda470_w.jpg",
          "https://live.staticflickr.com/65535/53765844336_7938cb4b51.jpg",
          "https://live.staticflickr.com/65535/53766037158_7e0656ecfa_m.jpg"
        ]
      },
      {
        "nome": "Logitech G Pro Flight Rudder Pedals",
        "descricao": "Pedais de leme projetados para simulação de voo em realidade virtual. Oferecem controle preciso sobre a direção do avião, proporcionando uma experiência de voo imersiva e realista.",
        "cor": "Preto",
        "valor": 699.00,
        "modelo": "Pro Flight Rudder Pedals",
        "peso": 2.0,
        "altura": 19.3,
        "comprimento": 31.2,
        "largura": 43.5,
        "fabricante": "Logitech",
        "fornecedor": "Amazon Brasil",
        "subCategoria": "Periféricos de VR",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53766173534_2906d0a3d7_n.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53765846161_315f587c15_n.jpg",
          "https://live.staticflickr.com/65535/53766173539_07eac4a93d_n.jpg",
          "https://live.staticflickr.com/65535/53764936897_1435252273_w.jpg"
        ]
      },
      {
        "nome": "TP-Link Archer C80",
        "descricao": "Access Point de alta performance com tecnologia Wi-Fi 6, oferecendo velocidades de até 1.5 Gbps. Possui antenas externas para melhor cobertura de sinal e é ideal para ambientes residenciais e escritórios.",
        "cor": "Branco",
        "valor": 399.90,
        "modelo": "Archer C80",
        "peso": 0.434,
        "altura": 24.3,
        "comprimento": 16.2,
        "largura": 3.4,
        "fabricante": "TP-Link",
        "fornecedor": "Electronics Emporium",
        "subCategoria": "Access Point",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765848851_fa5ca7142e_z.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53766176329_0ddc29976d_z.jpg",
          "https://live.staticflickr.com/65535/53766262050_f604c8c7cb_z.jpg",
          "https://live.staticflickr.com/65535/53766176334_99a389dd01_n.jpg"
        ]
      },
      {
        "nome": "Ubiquiti UniFi AP AC Lite",
        "descricao": "Access Point de alto desempenho com tecnologia Wi-Fi 5, oferecendo velocidades de até 867 Mbps. Possui design compacto e discreto, ideal para instalação em ambientes comerciais e corporativos.",
        "cor": "Branco",
        "valor": 299.00,
        "modelo": "UniFi AP AC Lite",
        "peso": 0.160,
        "altura": 16.1,
        "comprimento": 16.1,
        "largura": 3.2,
        "fabricante": "Ubiquiti",
        "fornecedor": "Pichau",
        "subCategoria": "Access Point",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765851226_4e639d8558_w.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53766264535_7d108c5156_w.jpg",
          "https://live.staticflickr.com/65535/53766264525_7bdd841fc5_w.jpg",
          "https://live.staticflickr.com/65535/53765851231_eae7b46293_n.jpg"
        ]
      },
      {
        "nome": "Cisco Aironet 1850 Series",
        "descricao": "Access Point corporativo com tecnologia Wi-Fi 5, projetado para ambientes de alta densidade. Oferece suporte para até 200 clientes simultâneos e possui recursos avançados de segurança e gerenciamento.",
        "cor": "Branco",
        "valor": 1299.00,
        "modelo": "Aironet 1850",
        "peso": 1.59,
        "altura": 4.4,
        "comprimento": 20.3,
        "largura": 20.3,
        "fabricante": "Cisco",
        "fornecedor": "Pichau",
        "subCategoria": "Access Point",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53764947382_ca48a4ae7a_m.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53766269645_032e6f49c0_n.jpg",
          "https://live.staticflickr.com/65535/53766269640_93bab5fc6f_m.jpg",
          "https://live.staticflickr.com/65535/53765856241_7b0abe6fab_m.jpg"
        ]
      },
      {
        "nome": "D-Link DAP-2660",
        "descricao": "Access Point corporativo com tecnologia Wi-Fi 5, oferecendo velocidades de até 1200 Mbps. Possui design resistente e suporta montagem em teto ou parede, ideal para ambientes de negócios.",
        "cor": "Branco",
        "valor": 699.00,
        "modelo": "DAP-2660",
        "peso": 0.230,
        "altura": 19.2,
        "comprimento": 19.2,
        "largura": 4.4,
        "fabricante": "D-Link",
        "fornecedor": "Mega Mamute",
        "subCategoria": "Access Point",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53766274640_a3cab6b659_n.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53766054108_337cb34f1e_n.jpg",
          "https://live.staticflickr.com/65535/53766188879_c6a05df44c_n.jpg",
          "https://live.staticflickr.com/65535/53766188889_586cba87ec_w.jpg"
        ]
      },
      {
        "nome": "MikroTik hAP ac²",
        "descricao": "Access Point de alto desempenho com tecnologia Wi-Fi 5, oferecendo velocidades de até 1.167 Mbps. Possui design compacto e é ideal para pequenas empresas e redes domésticas avançadas.",
        "cor": "Preto",
        "valor": 269.00,
        "modelo": "hAP ac²",
        "peso": 0.500,
        "altura": 3,
        "comprimento": 12,
        "largura": 12,
        "fabricante": "MikroTik",
        "fornecedor": "Girafa",
        "subCategoria": "Access Point",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53766194064_0d849272e0.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53766194069_4640f46e3f_m.jpg",
          "https://live.staticflickr.com/65535/53766059468_2b5ac41a72_z.jpg",
          "https://live.staticflickr.com/65535/53764957952_cf36d6f7e9_w.jpg"
        ]
      },
      {
        "nome": "TP-Link Archer T3U Plus",
        "descricao": "Adaptador Wi-Fi USB de alta velocidade com suporte para conexões de até 1300 Mbps em banda dual. Possui antena externa ajustável para melhor recepção de sinal e é compatível com diversas versões do Windows e macOS.",
        "cor": "Preto",
        "valor": 129.90,
        "modelo": "Archer T3U Plus",
        "peso": 0.033,
        "altura": 1.5,
        "comprimento": 6.1,
        "largura": 2.3,
        "fabricante": "TP-Link",
        "fornecedor": "Balão da Informática",
        "subCategoria": "Adaptadores",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53766284210_bb4e5de2f2_w.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53764961542_1d4870f206.jpg",
          "https://live.staticflickr.com/65535/53766284200_1f7355230c_n.jpg",
          "https://live.staticflickr.com/65535/53766284225_1394898c87_w.jpg"
        ]
      },
      {
        "nome": "Anker PowerExpand+ 7-in-1 USB-C",
        "descricao": "Adaptador multiportas USB-C que oferece diversas funcionalidades, incluindo portas HDMI, USB-A, leitor de cartão SD e microSD, além de portas de carregamento USB-C e USB-A. Ideal para expandir a conectividade de laptops e dispositivos móveis.",
        "cor": "Cinza",
        "valor": 299.00,
        "modelo": "PowerExpand+ 7-in-1",
        "peso": 0.068,
        "altura": 1.5,
        "comprimento": 12.4,
        "largura": 4.1,
        "fabricante": "Anker",
        "fornecedor": "Acer",
        "subCategoria": "Adaptadores",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765874961_d0db7ed48c.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53764965307_9f4d479e7b.jpg",
          "https://live.staticflickr.com/65535/53766288285_3d15f4873e_n.jpg",
          "https://live.staticflickr.com/65535/53764965297_7db0142d1d_n.jpg"
        ]
      },
      {
        "nome": "Microsoft Xbox Wireless Adapter",
        "descricao": "Adaptador USB para conectar controles Xbox One e Xbox Series X|S a computadores e dispositivos com Windows 10. Oferece conectividade sem fio de alta qualidade para uma experiência de jogo mais conveniente e sem interrupções.",
        "cor": "Preto",
        "valor": 149.99,
        "modelo": "Xbox Wireless Adapter",
        "peso": 0.020,
        "altura": 1.1,
        "comprimento": 4.7,
        "largura": 1.8,
        "fabricante": "Microsoft",
        "fornecedor": "Microsoft Brasil",
        "subCategoria": "Adaptadores",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53766290880_020fe796bd_n.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53766290885_442369b32d_w.jpg",
          "https://live.staticflickr.com/65535/53766290870_4713792578_n.jpg",
          "https://live.staticflickr.com/65535/53764967897_ca24f257c3_n.jpg"
        ]
      },
      {
        "nome": "Apple Thunderbolt 3 (USB-C) to Thunderbolt 2 Adapter",
        "descricao": "Adaptador para conectar dispositivos Thunderbolt 2 a portas Thunderbolt 3 (USB-C). Permite a conexão de dispositivos mais antigos a computadores e laptops mais recentes da Apple, mantendo altas velocidades de transferência de dados.",
        "cor": "Branco",
        "valor": 149.00,
        "modelo": "Thunderbolt 3 to Thunderbolt 2",
        "peso": 0.032,
        "altura": 1,
        "comprimento": 9.1,
        "largura": 1.7,
        "fabricante": "Apple",
        "fornecedor": "Apple Brasil",
        "subCategoria": "Adaptadores",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765883126_e661b5768d_n.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53766075318_d06189c4df_n.jpg",
          "https://live.staticflickr.com/65535/53766210229_61c4fe9cfe_w.jpg",
          "https://live.staticflickr.com/65535/53766296245_f130d0f639_w.jpg"
        ]
      },
      {
        "nome": "Amazon Basics DisplayPort to HDMI Adapter",
        "descricao": "Adaptador bidirecional que permite a conexão de dispositivos com porta DisplayPort a dispositivos com porta HDMI, ou vice-versa. Suporta resolução de até 4K e é ideal para conectar laptops, desktops e monitores a TVs e projetores.",
        "cor": "Preto",
        "valor": 19.99,
        "modelo": "DisplayPort to HDMI",
        "peso": 0.030,
        "altura": 1,
        "comprimento": 25.5,
        "largura": 4.5,
        "fabricante": "Amazon Basics",
        "fornecedor": "Amazon Brasil",
        "subCategoria": "Adaptadores",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53766213354_d2436dd711_w.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53764976582_81741f3463_n.jpg",
          "https://live.staticflickr.com/65535/53764976587_312957a97a_n.jpg",
          "https://live.staticflickr.com/65535/53766299525_c20a655fe9_n.jpg"
        ]
      },
      {
        "nome": "Cabo HDMI 2.1 Ultra HD 8K",
        "descricao": "Cabo HDMI de alta velocidade compatível com resoluções de até 8K, oferecendo imagens nítidas e vívidas. Suporta taxa de atualização de até 120Hz, HDR (High Dynamic Range) e áudio de alta definição. Ideal para conectar TVs, monitores, consoles de videogame e outros dispositivos compatíveis.",
        "cor": "Preto",
        "valor": 89.90,
        "modelo": "HDMI 2.1 8K",
        "peso": 0.1,
        "altura": 1,
        "comprimento": 200,
        "largura": 1.5,
        "fabricante": "UltraTech",
        "fornecedor": "Loja de Componentes",
        "subCategoria": "Cabos",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53766218294_dc40ffaaca_w.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53765891086_5cf3c88584_w.jpg",
          "https://live.staticflickr.com/65535/53766304360_4215e8c6a1_n.jpg",
          "https://live.staticflickr.com/65535/53766218304_66c4dd807a_n.jpg"
        ]
      },
      {
        "nome": "Cabo USB-C para Lightning",
        "descricao": "Cabo de alta qualidade para carregamento e sincronização de dispositivos Apple com conector Lightning, como iPhones e iPads, diretamente a dispositivos com porta USB-C, como laptops e adaptadores de energia. Possui certificação MFi da Apple para garantir compatibilidade e segurança.",
        "cor": "Branco",
        "valor": 119.00,
        "modelo": "USB-C to Lightning",
        "peso": 0.025,
        "altura": 1,
        "comprimento": 100,
        "largura": 0.5,
        "fabricante": "Apple",
        "fornecedor": "Apple Brasil",
        "subCategoria": "Cabos",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53764984957_9f79b7c7bf_z.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53766308175_6170094b50_z.jpg",
          "https://live.staticflickr.com/65535/53766308165_ebb4fa6a2e_n.jpg",
          "https://live.staticflickr.com/65535/53765894931_4b667c6a42_n.jpg"
        ]
      },
      {
        "nome": "Cabo Ethernet Cat 7",
        "descricao": "Cabo de rede Ethernet de alta performance Cat 7 para conexões de internet com velocidades de até 10 Gbps. Possui blindagem contra interferências e conectores banhados a ouro para garantir uma conexão estável e de alta qualidade. Ideal para redes domésticas e corporativas.",
        "cor": "Azul",
        "valor": 39.90,
        "modelo": "Cat 7",
        "peso": 0.15,
        "altura": 0.5,
        "comprimento": 500,
        "largura": 1,
        "fabricante": "TechNet",
        "fornecedor": "Loja de Componentes",
        "subCategoria": "Cabos",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53766090183_6ff9115435_z.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53766225864_5cd4443a5d_z.jpg",
          "https://live.staticflickr.com/65535/53765898331_624f4db36c_z.jpg",
          "https://live.staticflickr.com/65535/53766090193_ba9167b678_n.jpg"
        ]
      },
      {
        "nome": "Cabo de Áudio P2 para P2",
        "descricao": "Cabo de áudio estéreo de 3.5 mm (P2) para conexão entre dispositivos de áudio, como smartphones, tablets, laptops, MP3 players, entre outros, a alto-falantes, fones de ouvido, sistemas de som e amplificadores. Fabricado com materiais de alta qualidade para garantir transmissão de áudio sem perdas.",
        "cor": "Preto",
        "valor": 19.99,
        "modelo": "P2 to P2",
        "peso": 0.05,
        "altura": 0.3,
        "comprimento": 150,
        "largura": 0.3,
        "fabricante": "SoundX",
        "fornecedor": "Loja de Componentes",
        "subCategoria": "Cabos",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53766228594_25d0118529_n.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53766092828_5e36fde228_n.jpg",
          "https://live.staticflickr.com/65535/53766228604_a6ca14b397_w.jpg",
          "https://live.staticflickr.com/65535/53764991257_3db144d8f7_w.jpg"
        ]
      },
      {
        "nome": "Cabo de Energia Tripolar",
        "descricao": "Cabo de alimentação elétrica tripolar com plugues do tipo NBR 14136 e tomadas padrão ABNT. Indicado para conexão de equipamentos eletrônicos, eletrodomésticos e ferramentas elétricas a rede elétrica. Possui revestimento resistente e certificação de segurança.",
        "cor": "Preto",
        "valor": 29.90,
        "modelo": "Tripolar",
        "peso": 0.2,
        "altura": 1,
        "comprimento": 200,
        "largura": 1,
        "fabricante": "EletroPower",
        "fornecedor": "Universal Electronics Ltda",
        "subCategoria": "Cabos",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53766096258_dbcdf0da06_n.jpg",
          "imagens": [
              "https://live.staticflickr.com/65535/53766232214_f34623b207_w.jpg",
              "https://live.staticflickr.com/65535/53764994742_8c995502d7_w.jpg",
              "https://live.staticflickr.com/65535/53766096263_3e2fc230c4_w.jpg"
          ]
      },
      {
        "nome": "Cabo de Rede Ethernet Cat 7",
        "descricao": "Cabo de rede Ethernet de alta performance Cat 7 para conexões de internet com velocidades de até 10 Gbps. Possui blindagem contra interferências e conectores RJ45 banhados a ouro para garantir uma conexão estável e de alta qualidade. Ideal para redes domésticas e corporativas.",
        "cor": "preto",
        "valor": 39.90,
        "modelo": "Cat 7",
        "peso": 0.15,
        "altura": 0.5,
        "comprimento": 500,
        "largura": 1,
        "fabricante": "TechNet",
        "fornecedor": "Advanced Home Solutions Ltda",
        "subCategoria": "Cabos de Redes",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53766321210_26289192cf_n.jpg",
        "imagens": [
            "https://live.staticflickr.com/65535/53766099618_63dcf159a9_w.jpg",
            "https://live.staticflickr.com/65535/53766235284_e5105181c5_w.jpg",
            "https://live.staticflickr.com/65535/53766235289_c52a234ca4_n.jpg"
        ]
      },
      {
        "nome": "Cabo de Rede Ethernet Cat 6A",
        "descricao": "Cabo de rede Ethernet de alto desempenho Cat 6A para transmissão de dados em redes gigabit. Compatível com velocidades de até 10 Gbps e frequência de 500 MHz. Possui construção de alta qualidade com condutores de cobre puro e revestimento externo resistente.",
        "cor": "Cinza",
        "valor": 29.99,
        "modelo": "Cat 6A",
        "peso": 0.12,
        "altura": 0.4,
        "comprimento": 300,
        "largura": 0.8,
        "fabricante": "DataLink",
        "fornecedor": "Advanced Home Solutions Ltda",
        "subCategoria": "Cabos de Redes",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53766248034_6e3c42cb9c_n.jpg",
        "imagens": [
            "https://live.staticflickr.com/65535/53766112658_788afe1683_n.jpg",
            "https://live.staticflickr.com/65535/53765921306_26e07ab083_n.jpg",
            "https://live.staticflickr.com/65535/53766114768_91ae1dd498_n.jpg"
        ]
      },
      {
        "nome": "Cabo de Rede Ethernet Cat 6",
        "descricao": "Cabo de rede Ethernet de alta qualidade Cat 6 para transmissão de dados em redes gigabit. Compatível com velocidades de até 1 Gbps e frequência de 250 MHz. Possui condutores de cobre de alta pureza e revestimento externo resistente a impactos.",
        "cor": "Preto",
        "valor": 19.99,
        "modelo": "Cat 6",
        "peso": 0.1,
        "altura": 0.3,
        "comprimento": 200,
        "largura": 0.6,
        "fabricante": "NetLink",
        "fornecedor": "Advanced Home Solutions Ltda",
        "subCategoria": "Cabos de Redes",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765006827_747780c015_n.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53765006832_7a8c087fe0_z.jpg",
          "https://live.staticflickr.com/65535/53766108338_cccdc68f99_n.jpg",
          "https://live.staticflickr.com/65535/53766330260_d7eb5b7cbb_n.jpg"
      ]
      },
      {
        "nome": "Cabo de Rede Ethernet Cat 5e",
        "descricao": "Cabo de rede Ethernet de qualidade Cat 5e para transmissão de dados em redes de até 1000 Mbps. Possui construção robusta com condutores de cobre de alta pureza e revestimento externo resistente a interferências eletromagnéticas.",
        "cor": "Branco",
        "valor": 12.90,
        "modelo": "Cat 5e",
        "peso": 0.08,
        "altura": 0.3,
        "comprimento": 150,
        "largura": 0.5,
        "fabricante": "LinkFast",
        "fornecedor": "Loja de Componentes",
        "subCategoria": "Cabos de Redes",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765926276_e16e68f86c_n.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53766117578_30fc114c44_n.jpg",
          "https://live.staticflickr.com/65535/53765926281_10ea2a9efe_n.jpg",
          "https://live.staticflickr.com/65535/53765926286_0ea868664c_n.jpg"
      ]
      },
      {
        "nome": "Cabo de Rede Ethernet Cat 5",
        "descricao": "Cabo de rede Ethernet Cat 5 para transmissão de dados em redes de até 100 Mbps. Ideal para conexões de internet em residências e pequenos escritórios. Possui condutores de cobre de alta qualidade e revestimento externo durável.",
        "cor": "Amarelo",
        "valor": 9.90,
        "modelo": "Cat 5",
        "peso": 0.07,
        "altura": 0.2,
        "comprimento": 100,
        "largura": 0.4,
        "fabricante": "QuickLink",
        "fornecedor": "Home Automation Experts Ltda",
        "subCategoria": "Cabos de Redes",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53766120648_81aca477e6_z.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53766120333_cf8f749b33_w.jpg",
          "https://live.staticflickr.com/65535/53765929701_e7ed2b8162_n.jpg",
          "https://live.staticflickr.com/65535/53766120653_65785698dc_w.jpg"
      ]
      },
      {
        "nome": "Roteador Wi-Fi TP-Link Archer C7",
        "descricao": "Roteador dual-band com tecnologia Wi-Fi 5 (802.11ac) oferecendo velocidades combinadas de até 1750 Mbps. Possui quatro antenas externas para melhor cobertura de sinal e portas gigabit para conexões com fio de alta velocidade.",
        "cor": "Preto",
        "valor": 399.90,
        "modelo": "Archer C7",
        "peso": 0.5,
        "altura": 3,
        "comprimento": 25,
        "largura": 20,
        "fabricante": "TP-Link",
        "fornecedor": "Electronics Emporium",
        "subCategoria": "Roteadores",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765022632_99e2c3c722_z.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53766259604_77507c3972_n.jpg",
          "https://live.staticflickr.com/65535/53766346430_786f2b135e_n.jpg",
          "https://live.staticflickr.com/65535/53766124288_0117817c5b_m.jpg"
      ]
      },
      {
        "nome": "Roteador Wi-Fi Mesh ASUS ZenWiFi AX Mini XD4",
        "descricao": "Sistema de roteadores mesh com tecnologia Wi-Fi 6 (802.11ax) oferecendo cobertura de rede de alta velocidade em toda a casa. O pacote inclui dois roteadores que podem ser configurados para formar uma rede mesh para eliminar pontos mortos de sinal.",
        "cor": "Branco",
        "valor": 899.99,
        "modelo": "ZenWiFi AX Mini XD4",
        "peso": 0.7,
        "altura": 5,
        "comprimento": 15,
        "largura": 15,
        "fabricante": "ASUS",
        "fornecedor": "Eletro Shopping",
        "subCategoria": "Roteadores",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53766001951_2ca0c7b098_n.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53765089827_f7ce79f2a8_n.jpg",
          "https://live.staticflickr.com/65535/53766327544_5176a4e175_n.jpg",
          "https://live.staticflickr.com/65535/53766413990_836849c3e5_w.jpg"
      ]
      },
      {
        "nome": "Roteador Mesh Wi-Fi 6 TP-Link Deco X20",
        "descricao": "Sistema de roteadores mesh com tecnologia Wi-Fi 6 (802.11ax) oferecendo cobertura de rede de alta velocidade e capacidade para vários dispositivos conectados simultaneamente. Ideal para casas grandes e escritórios.",
        "cor": "Branco",
        "valor": 799.00,
        "modelo": "Deco X20",
        "peso": 0.6,
        "altura": 4,
        "comprimento": 20,
        "largura": 20,
        "fabricante": "TP-Link",
        "fornecedor": "Eletro Shopping",
        "subCategoria": "Roteadores",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53766128968_dbf2cf7d3e_z.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53766351050_562f9a1f7c_z.jpg",
          "https://live.staticflickr.com/65535/53765027272_809e5f09f1_n.jpg",
          "https://live.staticflickr.com/65535/53766264169_45641e5dcc_n.jpg"
      ]
      },
      {
        "nome": "Roteador Wi-Fi 6 ASUS RT-AX86U",
        "descricao": "Roteador dual-band com tecnologia Wi-Fi 6 (802.11ax) oferecendo velocidades de até 5700 Mbps. Equipado com o processador quad-core de 1.8 GHz para desempenho superior em redes congestionadas.",
        "cor": "Preto",
        "valor": 1099.00,
        "modelo": "RT-AX86U",
        "peso": 0.8,
        "altura": 5,
        "comprimento": 30,
        "largura": 25,
        "fabricante": "ASUS",
        "fornecedor": "Amazon Brasil",
        "subCategoria": "Roteadores",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53766354090_8dcf34c29b_n.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53766267634_109a2f3f84_n.jpg",
          "https://live.staticflickr.com/65535/53766267629_d69b2c6764_n.jpg",
          "https://live.staticflickr.com/65535/53766132158_34e129685f_n.jpg"
      ]
      },
      {
        "nome": "Roteador Wi-Fi 6 TP-Link Archer AX10",
        "descricao": "Roteador dual-band com tecnologia Wi-Fi 6 (802.11ax) oferecendo velocidades de até 1500 Mbps. Equipado com quatro antenas para melhor cobertura de sinal e portas gigabit para conexões com fio de alta velocidade.",
        "cor": "Preto",
        "valor": 349.90,
        "modelo": "Archer AX10",
        "peso": 0.4,
        "altura": 3,
        "comprimento": 20,
        "largura": 15,
        "fabricante": "TP-Link",
        "fornecedor": "Amazon Brasil",
        "subCategoria": "Roteadores",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53766269684_15fd9a5360_z.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53766356225_3c75e82311_z.jpg",
          "https://live.staticflickr.com/65535/53765032667_6bde68f128_z.jpg",
          "https://live.staticflickr.com/65535/53765943466_34da1c8294_n.jpg"
      ]
      },
      {
        "nome": "Switch Gigabit Ethernet TP-Link TL-SG108",
        "descricao": "Switch de mesa com 8 portas Gigabit Ethernet, oferecendo conectividade rápida e confiável para dispositivos com fio. Ideal para redes domésticas e pequenos escritórios.",
        "cor": "Azul",
        "valor": 159.90,
        "modelo": "TL-SG108",
        "peso": 0.35,
        "altura": 2,
        "comprimento": 15,
        "largura": 10,
        "fabricante": "TP-Link",
        "fornecedor": "GIGABYTE Brasil",
        "subCategoria": "Switches",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53766137908_827093780e_z.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53765035977_b421351757_z.jpg",
          "https://live.staticflickr.com/65535/53765946816_89dc9846b3_n.jpg",
          "https://live.staticflickr.com/65535/53765035982_8dea3300eb_n.jpg"
      ]
      },
      {
        "nome": "Switch Gerenciável Cisco SG350-10",
        "descricao": "Switch de 10 portas Gigabit Ethernet gerenciável com recursos avançados de rede, como VLAN, QoS e suporte a IPv6. Projetado para pequenas empresas que necessitam de um desempenho confiável e flexibilidade de rede.",
        "cor": "Preto",
        "valor": 899.99,
        "modelo": "SG350-10",
        "peso": 0.8,
        "altura": 5,
        "comprimento": 25,
        "largura": 15,
        "fabricante": "Cisco",
        "fornecedor": "Girafa",
        "subCategoria": "Switches",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53766142348_2ac9f2e69c_n.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53766277599_da9c26da39_m.jpg",
          "https://live.staticflickr.com/65535/53766142868_691c99358d_n.jpg",
          "https://live.staticflickr.com/65535/53766277604_06f14e2742.jpg"
      ]
      },
      {
        "nome": "Switch PoE+ TP-Link TL-SG1008P",
        "descricao": "Switch de mesa com 8 portas Gigabit Ethernet, incluindo 4 portas PoE+ para alimentação de dispositivos como câmeras IP, telefones VoIP e pontos de acesso Wi-Fi. Oferece uma solução fácil para expandir sua rede PoE.",
        "cor": "Preto",
        "valor": 299.90,
        "modelo": "TL-SG1008P",
        "peso": 0.4,
        "altura": 3,
        "comprimento": 20,
        "largura": 15,
        "fabricante": "TP-Link",
        "fornecedor": "Kabum",
        "subCategoria": "Switches",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765955166_9f28955eef_z.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53766281179_bcba9a5c59_n.jpg",
          "https://live.staticflickr.com/65535/53766367460_1a37fbcdc4_n.jpg",
          "https://live.staticflickr.com/65535/53766145893_e742027305_m.jpg"
      ]
      },
      {
        "nome": "Switch Gigabit Ethernet D-Link DGS-1100-08P",
        "descricao": "Switch compacto de 8 portas Gigabit Ethernet com 4 portas PoE+ e recursos de VLAN e QoS. Ideal para pequenas empresas que precisam de uma solução de rede confiável e fácil de usar.",
        "cor": "Preto",
        "valor": 499.99,
        "modelo": "DGS-1100-08P",
        "peso": 0.6,
        "altura": 3,
        "comprimento": 20,
        "largura": 15,
        "fabricante": "D-Link",
        "fornecedor": "Pichau",
        "subCategoria": "Switches",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765958416_011af9dc04_z.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53765046932_e689924043_z.jpg",
          "https://live.staticflickr.com/65535/53766370465_e69ac5d190_w.jpg",
          "https://live.staticflickr.com/65535/53766370450_239662d7d4_m.jpg"
      ]
      },
      {
        "nome": "Switch Gerenciável Netgear GS308E",
        "descricao": "Switch não gerenciável de 8 portas Gigabit Ethernet com capacidade de gerenciamento básico por meio de aplicativo móvel. Compacto e eficiente em termos energéticos, ideal para uso doméstico ou em pequenos escritórios.",
        "cor": "Branco",
        "valor": 199.00,
        "modelo": "GS308E",
        "peso": 0.3,
        "altura": 2,
        "comprimento": 15,
        "largura": 10,
        "fabricante": "Netgear",
        "fornecedor": "Universal Electronics Ltda",
        "subCategoria": "Switches",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53766287239_2248c96aa0_n.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53766151548_3ce22db101_n.jpg",
          "https://live.staticflickr.com/65535/53765050057_ccdcc1c715_n.jpg",
          "https://live.staticflickr.com/65535/53766151568_08fec4d7cd_n.jpg"
      ]
      },
      {
        "nome": "PlayStation 5",
        "descricao": "Console de mesa de última geração da Sony, oferecendo jogos em 4K, velocidade de carregamento ultrarrápida, áudio 3D e suporte a ray tracing. Inclui um controle DualSense com feedback tátil e gatilhos adaptativos.",
        "cor": "Branco",
        "valor": 4999.00,
        "modelo": "PS5",
        "peso": 4.5,
        "altura": 10,
        "comprimento": 40,
        "largura": 30,
        "fabricante": "Sony",
        "fornecedor": "Sony Brasil",
        "subCategoria": "Console de Mesa",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53766289469_ef7aa48368_w.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53765052202_be459430a7_w.jpg",
          "https://live.staticflickr.com/65535/53766153733_130e261a35_z.jpg",
          "https://live.staticflickr.com/65535/53765052207_77f8b1830d_z.jpg"
      ]
      },
      {
        "nome": "Xbox Series X",
        "descricao": "Console de mesa de última geração da Microsoft, oferecendo jogos em 4K, velocidade de carregamento ultrarrápida, retrocompatibilidade e suporte a ray tracing. Inclui um controle Xbox Wireless com recursos avançados.",
        "cor": "Preto",
        "valor": 4599.00,
        "modelo": "Xbox Series X",
        "peso": 4.5,
        "altura": 15,
        "comprimento": 40,
        "largura": 30,
        "fabricante": "Microsoft",
        "fornecedor": "Microsoft Brasil",
        "subCategoria": "Console de Mesa",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765965876_3b7577bebd_w.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53766378010_357ea67a88_n.jpg",
          "https://live.staticflickr.com/65535/53765965886_75d10d23fd_n.jpg",
          "https://live.staticflickr.com/65535/53765965871_e89f2d37f1.jpg"
      ]
      },
      {
        "nome": "Nintendo Switch",
        "descricao": "Console híbrido de mesa e portátil da Nintendo, oferecendo uma ampla variedade de jogos exclusivos, tanto para uso em casa quanto em movimento. Inclui dois controles Joy-Con removíveis e uma base para conexão à TV.",
        "cor": "Preto",
        "valor": 2999.00,
        "modelo": "Nintendo Switch",
        "peso": 0.9,
        "altura": 4,
        "comprimento": 23,
        "largura": 10,
        "fabricante": "Nintendo",
        "fornecedor": "Nintendo Brasil",
        "subCategoria": "Console de Mesa",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765056462_39844dabdc_n.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53765967701_b10a99dd60_w.jpg",
          "https://live.staticflickr.com/65535/53765967706_5e09432f93_z.jpg",
          "https://live.staticflickr.com/65535/53766293764_b90892104e_z.jpg"
      ]
      },
      {
        "nome": "PlayStation 4 Pro",
        "descricao": "Versão aprimorada do console PlayStation 4, oferecendo jogos em 4K, HDR e desempenho aprimorado. Inclui um controle DualShock 4 e acesso à extensa biblioteca de jogos do PS4.",
        "cor": "Preto",
        "valor": 2299.00,
        "modelo": "PS4 Pro",
        "peso": 3.3,
        "altura": 5,
        "comprimento": 30,
        "largura": 25,
        "fabricante": "Sony",
        "fornecedor": "Sony Brasil",
        "subCategoria": "Console de Mesa",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53766160288_55cc436ae7_w.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53765970001_c864798755_n.jpg",
          "https://live.staticflickr.com/65535/53766160293_e16c76d04f_z.jpg",
          "https://live.staticflickr.com/65535/53766295994_8df0146731_z.jpg"
      ]
      },
      {
        "nome": "Xbox One S",
        "descricao": "Versão compacta e mais acessível do console Xbox One, oferecendo jogos em 4K HDR e streaming de vídeo em 4K. Inclui um controle Xbox Wireless e acesso à biblioteca de jogos do Xbox One.",
        "cor": "Branco",
        "valor": 1699.00,
        "modelo": "Xbox One S",
        "peso": 2.9,
        "altura": 5,
        "comprimento": 30,
        "largura": 25,
        "fabricante": "Microsoft",
        "fornecedor": "Microsoft Brasil",
        "subCategoria": "Console de Mesa",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53765972291_841a3ee2bd_w.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53766162433_6a0381e01d_w.jpg",
          "https://live.staticflickr.com/65535/53766384175_df7fbfe0e7_z.jpg",
          "https://live.staticflickr.com/65535/53766162428_dd04c1a3e5_z.jpg"
      ]
      },
      {
        "nome": "MacBook Air M1",
        "descricao": "Notebook ultrafino da Apple, alimentado pelo chip M1, oferecendo desempenho excepcional e eficiência energética. Possui tela Retina de 13 polegadas, teclado Magic Keyboard e até 18 horas de duração da bateria.",
        "cor": "Prateado",
        "valor": 9999.00,
        "modelo": "MacBook Air",
        "peso": 1.29,
        "altura": 0.41,
        "comprimento": 30.41,
        "largura": 21.24,
        "fabricante": "Apple",
        "fornecedor": "Apple Brasil",
        "subCategoria": "Portátil",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53766300864_23425bf071_z.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53766300859_7d4603a9c2_z.jpg",
          "https://live.staticflickr.com/65535/53765975176_801bb7f20c_z.jpg",
          "https://live.staticflickr.com/65535/53765063357_180ef8e7cc_n.jpg"
      ]
      },
      {
        "nome": "Dell XPS 13",
        "descricao": "Notebook premium da Dell, conhecido por sua construção de alta qualidade, tela InfinityEdge de 13,4 polegadas com resolução 4K, processadores Intel Core de última geração e design ultracompacto.",
        "cor": "Prateado",
        "valor": 8799.00,
        "modelo": "XPS 13",
        "peso": 1.2,
        "altura": 1.5,
        "comprimento": 30.4,
        "largura": 19.6,
        "fabricante": "Dell",
        "fornecedor": "Dell",
        "subCategoria": "Portátil",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53766168398_b0507123bc_z.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53765066177_57627d9ca4_n.jpg",
          "https://live.staticflickr.com/65535/53765066192_20023ba78f_n.jpg",
          "https://live.staticflickr.com/65535/53765977931_09120a0308_z.jpg"
      ]
      },
      {
        "nome": "Microsoft Surface Laptop 4",
        "descricao": "Notebook elegante e poderoso da Microsoft, disponível em versões de 13,5 e 15 polegadas. Oferece desempenho excepcional, tela PixelSense sensível ao toque, teclado confortável e longa duração da bateria.",
        "cor": "Preto",
        "valor": 7999.00,
        "modelo": "Surface Laptop 4",
        "peso": 1.3,
        "altura": 1.5,
        "comprimento": 30.8,
        "largura": 22.3,
        "fabricante": "Microsoft",
        "fornecedor": "Microsoft Brasil",
        "subCategoria": "Portátil",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53766398800_a8b90557da_n.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53765074962_b63de78f4f_n.jpg",
          "https://live.staticflickr.com/65535/53766398795_a872dd5066_n.jpg",
          "https://live.staticflickr.com/65535/53766398790_ecfee26de0_n.jpg"
      ]
      },
      {
        "nome": "HP Spectre x360",
        "descricao": "Notebook conversível premium da HP, oferecendo flexibilidade de uso como laptop ou tablet. Possui tela OLED de 13,3 polegadas, processadores Intel Core de 11ª geração e design ultrafino de alta qualidade.",
        "cor": "Prateado",
        "valor": 7499.00,
        "modelo": "Spectre x360",
        "peso": 1.32,
        "altura": 1.69,
        "comprimento": 30.65,
        "largura": 19.45,
        "fabricante": "HP",
        "fornecedor": "HP",
        "subCategoria": "Portátil",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53766316369_a48de5009b_n.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53766181123_1f8c08ab9a_n.jpg",
          "https://live.staticflickr.com/65535/53766181153_ecbefcae4b_n.jpg",
          "https://live.staticflickr.com/65535/53766402615_0c87c7b44a_n.jpg"
      ]    },
      {
        "nome": "Lenovo ThinkPad X1 Carbon",
        "descricao": "Notebook empresarial premium da Lenovo, conhecido por sua durabilidade, desempenho sólido e portabilidade. Oferece uma tela de 14 polegadas, design ultraleve, teclado ergonômico e recursos de segurança avançados.",
        "cor": "Preto",
        "valor": 7299.00,
        "modelo": "ThinkPad X1 Carbon",
        "peso": 1.13,
        "altura": 1.61,
        "comprimento": 32.3,
        "largura": 21.7,
        "fabricante": "Lenovo",
        "fornecedor": "Lenovo",
        "subCategoria": "Portátil",
        "imagemPrincipal": "https://live.staticflickr.com/65535/53766405820_b781a508a2_n.jpg",
        "imagens": [
          "https://live.staticflickr.com/65535/53766319569_f80f391748_n.jpg",
          "https://live.staticflickr.com/65535/53766319559_5ec9587118_n.jpg",
          "https://live.staticflickr.com/65535/53765993906_693645bd28_n.jpg"
        ]    
      }
    ];

    const fornecedores = [
        {
            "nome": "Acer",
            "telefone": "84256116831",
            "cep": "12345678",
            "email": "contato@acer.com",
            "numeroLogradouro": "1000",
            "cnpj": "12345678000190",
            "complemento": "Sala 101"
          },
          {
            "nome": "Advanced Home Solutions Ltda",
            "telefone": "64240778461",
            "cep": "23456789",
            "email": "contato@advancedhomesolutions.com",
            "numeroLogradouro": "2000",
            "cnpj": "23456789000101",
            "complemento": "Sala 202"
          },
          {
            "nome": "AMD Brasil",
            "telefone": "11315147002",
            "cep": "04578000",
            "email": "contato@amd.com",
            "numeroLogradouro": "1608",
            "cnpj": "24502809000103",
            "complemento": "Vila Olímpia"
          },
          {
            "nome": "Amazon Brasil",
            "telefone": "79327613463",
            "cep": "34567890",
            "email": "contato@amazon.com.br",
            "numeroLogradouro": "3000",
            "cnpj": "15436940000103",
            "complemento": "Sala 303"
          },
          {
            "nome": "Anker Brasil",
            "telefone": "97288331264",
            "cep": "45678901",
            "email": "contato@anker.com.br",
            "numeroLogradouro": "4000",
            "cnpj": "34567890000112",
            "complemento": "Sala 404"
          },
          {
            "nome": "Apple Brasil",
            "telefone": "89242532545",
            "cep": "56789012",
            "email": "contato@apple.com.br",
            "numeroLogradouro": "5000",
            "cnpj": "90623904000173",
            "complemento": "Sala 505"
          },
          {
            "nome": "Apple Store",
            "telefone": "83281645925",
            "cep": "67890123",
            "email": "contato@applestore.com",
            "numeroLogradouro": "6000",
            "cnpj": "11234567000134",
            "complemento": "Sala 606"
          },
          {
            "nome": "ASUS Brasil",
            "telefone": "27223345655",
            "cep": "78901234",
            "email": "contato@asus.com.br",
            "numeroLogradouro": "7000",
            "cnpj": "78427084000147",
            "complemento": "Sala 707"
          },
          {
            "nome": "Balão da Informática",
            "telefone": "14395085272",
            "cep": "89012345",
            "email": "contato@balaodainformatica.com",
            "numeroLogradouro": "8000",
            "cnpj": "45678901000156",
            "complemento": "Sala 808"
          },
          {
            "nome": "Cissa Magazine",
            "telefone": "19256655384",
            "cep": "90123456",
            "email": "contato@cissamagazine.com.br",
            "numeroLogradouro": "9000",
            "cnpj": "56789012000167",
            "complemento": "Sala 909"
          },
          {
            "nome": "Cooler Master Brasil",
            "telefone": "62228858597",
            "cep": "01234567",
            "email": "contato@coolermaster.com.br",
            "numeroLogradouro": "10000",
            "cnpj": "67890123000178",
            "complemento": "Sala 1010"
          },
          {
            "nome": "Dell",
            "telefone": "71271864893",
            "cep": "12345678",
            "email": "contato@dell.com.br",
            "numeroLogradouro": "11000",
            "cnpj": "78901234000189",
            "complemento": "Sala 1111"
          },
          {
            "nome": "Eletro Shopping",
            "telefone": "22304494358",
            "cep": "23456789",
            "email": "contato@eletroshopping.com",
            "numeroLogradouro": "12000",
            "cnpj": "89012345000190",
            "complemento": "Sala 1212"
          },
          {
            "nome": "Electronics Emporium",
            "telefone": "55349493804",
            "cep": "34567890",
            "email": "contato@electronicsemporium.com",
            "numeroLogradouro": "13000",
            "cnpj": "90123456000101",
            "complemento": "Sala 1313"
          },
          {
            "nome": "GIGABYTE Brasil",
            "telefone": "95336492531",
            "cep": "45678901",
            "email": "contato@gigabyte.com.br",
            "numeroLogradouro": "14000",
            "cnpj": "41234567000112",
            "complemento": "Sala 1414"
          },
          {
            "nome": "Girafa",
            "telefone": "86316975728",
            "cep": "56789012",
            "email": "contato@girafa.com.br",
            "numeroLogradouro": "15000",
            "cnpj": "12345678000123",
            "complemento": "Sala 1515"
          },
          {
            "nome": "Google Store",
            "telefone": "53331930370",
            "cep": "67890123",
            "email": "contato@googlestore.com",
            "numeroLogradouro": "16000",
            "cnpj": "23456789000134",
            "complemento": "Sala 1616"
          },
          {
            "nome": "Home Automation Experts Ltda",
            "telefone": "93333962720",
            "cep": "78901234",
            "email": "contato@homeautomationexperts.com",
            "numeroLogradouro": "17000",
            "cnpj": "34567890000145",
            "complemento": "Sala 1717"
          },
          {
            "nome": "HP",
            "telefone": "68254984235",
            "cep": "89012345",
            "email": "contato@hp.com",
            "numeroLogradouro": "18000",
            "cnpj": "15678901000156",
            "complemento": "Sala 1818"
          },
          {
            "nome": "Intel Brasil",
            "telefone": "62322892408",
            "cep": "90123456",
            "email": "contato@intel.com.br",
            "numeroLogradouro": "19000",
            "cnpj": "56789012003167",
            "complemento": "Sala 1919"
          },
          {
            "nome": "Kabum",
            "telefone": "81362849830",
            "cep": "01234567",
            "email": "contato@kabum.com.br",
            "numeroLogradouro": "20000",
            "cnpj": "67890123000978",
            "complemento": "Sala 2020"
          },
          {
            "nome": "Lenovo",
            "telefone": "62276927321",
            "cep": "12345678",
            "email": "contato@lenovo.com.br",
            "numeroLogradouro": "21000",
            "cnpj": "78901334000189",
            "complemento": "Sala 2121"
          },
          {
            "nome": "Loja de Componentes",
            "telefone": "49318935064",
            "cep": "23456789",
            "email": "contato@lojadecomponentes.com",
            "numeroLogradouro": "22000",
            "cnpj": "89012545000190",
            "complemento": "Sala 2222"
          },
          {
            "nome": "Mega Mamute",
            "telefone": "63369824012",
            "cep": "01234567",
            "email": "contato@megamamute.com.br",
            "numeroLogradouro": "300",
            "cnpj": "12345678060190",
            "complemento": "Bloco A"
          },
          {
            "nome": "Microsoft Brasil",
            "telefone": "93261592511",
            "cep": "12345678",
            "email": "contato@microsoft.com.br",
            "numeroLogradouro": "700",
            "cnpj": "12345678010121",
            "complemento": "Edifício Microsoft"
          },
          {
            "nome": "Mi Store",
            "telefone": "91235583953",
            "cep": "23456789",
            "email": "contato@mistore.com.br",
            "numeroLogradouro": "50",
            "cnpj": "23456789000732",
            "complemento": "Loja 15"
          },
          {
            "nome": "Motorola Brasil",
            "telefone": "86215489298",
            "cep": "34567890",
            "email": "contato@motorola.com.br",
            "numeroLogradouro": "1500",
            "cnpj": "34567894040143",
            "complemento": "Andar 2"
          },
          {
            "nome": "MSI Brasil",
            "telefone": "86268241497",
            "cep": "45678901",
            "email": "contato@msi.com.br",
            "numeroLogradouro": "900",
            "cnpj": "45678901457154",
            "complemento": "Sala 3"
          },
          {
            "nome": "Nintendo Brasil",
            "telefone": "61314679526",
            "cep": "56789012",
            "email": "contato@nintendo.com.br",
            "numeroLogradouro": "450",
            "cnpj": "56789012978165",
            "complemento": "Bloco B"
          },
          {
            "nome": "Noctua Brasil",
            "telefone": "97205836978",
            "cep": "67890123",
            "email": "contato@noctua.com.br",
            "numeroLogradouro": "123",
            "cnpj": "67890123007177",
            "complemento": "Edifício Verde"
          },
          {
            "nome": "NVIDIA Brasil",
            "telefone": "93381315911",
            "cep": "78901234",
            "email": "contato@nvidia.com.br",
            "numeroLogradouro": "800",
            "cnpj": "78905234000187",
            "complemento": "Sala 1"
          },
          {
            "nome": "Pichau",
            "telefone": "82202058893",
            "cep": "89012345",
            "email": "contato@pichau.com.br",
            "numeroLogradouro": "500",
            "cnpj": "89012345000198",
            "complemento": "Andar 3"
          },
          {
            "nome": "Roku Brasil",
            "telefone": "65396634833",
            "cep": "90123456",
            "email": "contato@roku.com.br",
            "numeroLogradouro": "200",
            "cnpj": "90123456000109",
            "complemento": "Bloco C"
          },
          {
            "nome": "Samsung Brasil",
            "telefone": "83325027788",
            "cep": "01234567",
            "email": "contato@samsung.com.br",
            "numeroLogradouro": "1000",
            "cnpj": "11234567000110",
            "complemento": "Sala 100"
          },
          {
            "nome": "Smart Living Electronics Ltda",
            "telefone": "44327830099",
            "cep": "12345678",
            "email": "contato@smartliving.com.br",
            "numeroLogradouro": "700",
            "cnpj": "12345678000121",
            "complemento": "Andar 2"
          },
          {
            "nome": "Sony Brasil",
            "telefone": "83251655698",
            "cep": "23456789",
            "email": "contato@sony.com.br",
            "numeroLogradouro": "50",
            "cnpj": "23456789000132",
            "complemento": "Edifício Sony"
          },
          {
            "nome": "Universal Electronics Ltda",
            "telefone": "96209085993",
            "cep": "34567890",
            "email": "contato@universalelectronics.com.br",
            "numeroLogradouro": "1500",
            "cnpj": "34567890000143",
            "complemento": "Loja 5"
          },
          {
            "nome": "Xiaomi Brasil",
            "telefone": "83381311819",
            "cep": "45678901",
            "email": "contato@xiaomi.com.br",
            "numeroLogradouro": "900",
            "cnpj": "45678901000154",
            "complemento": "Bloco D"
          }
    ];


    async function processarFornecedores() {
        for (const fornecedor of fornecedores) {
            const resultado = await cadastrarFornecedor(fornecedor, 'fornecedor');
            if (resultado) {
                console.log('Fornecedor cadastrado com sucesso:', resultado);
            } else {
                console.log('Falha ao cadastrar Fornecedor:', produto.nome);
            }
        }
    }

    async function processarProdutos() {
        for (const produto of produtos) {
            try {
                const resultado = await cadastrarProduto(produto);
                if (resultado) {
                    console.log('Produto cadastrado com sucesso:', resultado);
                } else {
                    console.log('Falha ao cadastrar produto:', produto.nome, resultado.error);
                }
            } catch (error) {
                console.error('Erro ao cadastrar produto:', produto.nome, error);
                throw error; // Interrompe o loop ao lançar uma exceção
            }
        }
    }

    return (
        <main>
            <section className='contentAbout'>
                <div className="title">
                    <hr />
                    <h2>Sobre</h2>
                    <hr />
                </div>

                <div className="content">
                    {/* <button onClick={handleProdutos}>Cadastrar produtos</button>
                    <button onClick={handleFornecedores}>Cadastrar Fornecedores</button> */}
                    <p className='text'>Desde sua fundação em 2023, a Lemnos lidera o mercado tecnológico
                        com a sua inovação, oferecendo uma ampla gama de
                        produtos de ponta.
                        <br /><br />
                        Comprometida em tornar a tecnologia mais acessível, a
                        empresa garante produtos de alta qualidade e uma experiência
                        de  compra excepcional, com uma equipe especializada que
                        busca  constantemente expandir seus serviços e produtos.
                        <br /><br />
                        Bem-vindo à Lemnos, onde a paixão pela tecnologia e a busca
                        pela excelência definem o futuro da inovação tecnológica.
                    </p>
                    <img
                        className='logoDark'
                        src={LogoHorizontalLight}
                        alt="logo"
                    />
                    <img
                        className='logoLight'
                        src={LogoHorizontalDark}
                        alt="logo"
                    />
                </div>
            </section>

            <section className='contentValues'>
                <div className='content'>
                    <div className="item">
                        <h3>Missão</h3>
                        <p>Na Lemnos, buscamos democratizar o acesso à tecnologia 
                            através de produtos inovadores a preços acessíveis. 
                            Nosso compromisso é oferecer produtos de alta qualidade 
                            que conectem e capacitem nossos clientes em todas as 
                            áreas de suas vidas.
                        </p>
                    </div>
                    <div className="item">
                        <h3>Plataforma</h3>
                        <p>A plataforma Lemnos oferece uma vitrine digital intuitiva 
                            com uma ampla gama de produtos tecnológicos de ponta, 
                            proporcionando uma experiência de compra simplificada e 
                            personalizada.
                        </p>
                    </div>
                    <div className="item">
                        <h3>Valores</h3>
                        <p>Na Lemnos, priorizamos a excelência e a satisfação do 
                            cliente, oferecendo tecnologia e soluções adaptadas às 
                            suas necessidades. Nosso ambiente acolhedor e 
                            informativo atende tanto entusiastas quanto iniciantes.
                        </p>
                    </div>
                </div>
            </section>

            <section className='contentMascot'>
                <div className="title">
                    <hr />
                    <h2>TechFesto</h2>
                    <hr />
                </div>

                <div className="content">
                    <p className='text'>Na Lemnos, nosso mascote, TechFesto, personifica a fusão
                        entre a mitologia antiga e a inovação contemporânea,
                        simbolizando nossa busca pela excelência e progresso
                        tecnológico.
                        <br /><br />
                        Como guardião tecnológico, ele embarca em uma jornada com
                            nossos clientes, utilizando seu conhecimento para desvendar
                            novas possibilidades.
                        <br /><br />
                        Junte-se a TechFesto e à comunidade Lemnos na busca pela
                            excelência e inovação, onde a inspiração mitológica
                            impulsiona a tecnologia do futuro.
                    </p>
                    <img 
                        src={TechFesto} 
                        alt="Mascote TechFesto" 
                        className='imgMascot'
                    />
                </div>
            </section>
        </main>
    )
}