import React, { useState } from 'react';
import {
  FileImage,
  ShieldCheck,
  Zap,
  Eye,
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ImageUploader } from '../../modules/croqui-converter/components/ImageUploader';
import { ConverterConfig } from '../../modules/croqui-converter/components/ConverterConfig';
import { ConverterResult } from '../../modules/croqui-converter/components/ConverterResult';
import {
  ConversionOptions,
  ConversionResult,
  ImageSourceMeta,
} from '../../modules/croqui-converter/types';
import {
  processImageToCroqui,
  calculateOutputDimensions,
} from '../../modules/croqui-converter/services/imageProcessor';

export const CroquiConverter: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<HTMLImageElement | null>(null);
  const [selectedMeta, setSelectedMeta] = useState<ImageSourceMeta | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [conversionResult, setConversionResult] = useState<ConversionResult | null>(null);
  const navigate = useNavigate();

  const [options, setOptions] = useState<ConversionOptions>({
    targetWidth: 1300,
    quality: 0.90,
    outputName: 'croqui_convertido',
  });

  const handleImageLoaded = (img: HTMLImageElement, meta: ImageSourceMeta) => {
    setSelectedImage(img);
    setSelectedMeta(meta);
    setErrorMessage(null);
    setConversionResult(null);

    // Sugere nome automático baseado no arquivo: [nome-original]_croqui
    const baseName = meta.name.replace(/\.[^.]+$/, '');
    setOptions((prev) => ({
      ...prev,
      outputName: `${baseName}_croqui`,
    }));
  };

  const handleClear = () => {
    if (selectedMeta?.previewUrl) {
      URL.revokeObjectURL(selectedMeta.previewUrl);
    }
    setSelectedImage(null);
    setSelectedMeta(null);
    setConversionResult(null);
    setErrorMessage(null);
    setOptions({
      targetWidth: 1300,
      quality: 0.90,
      outputName: 'croqui_convertido',
    });
  };

  const handleGenerate = async () => {
    if (!selectedImage) return;

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      // Simula pequeno delay visual para sensação de processamento
      await new Promise((resolve) => setTimeout(resolve, 150));
      const res = await processImageToCroqui(selectedImage, options);
      setConversionResult(res);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Falha desconhecida ao gerar arquivo .croqui.';
      setErrorMessage(msg);
    } finally {
      setIsProcessing(false);
    }
  };

  // Cálculo de dimensões previstas em tempo real
  const predictedDimensions = selectedMeta
    ? calculateOutputDimensions(
        selectedMeta.naturalWidth,
        selectedMeta.naturalHeight,
        options.targetWidth
      )
    : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', padding: '24px' }} className="animate-fade-in">
      {/* Header da Ferramenta */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'rgba(99, 102, 241, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary-400)',
              }}
            >
              <FileImage size={20} />
            </div>
            <h1 style={{ fontSize: '24px', fontWeight: 800, letterSpacing: '-0.02em', color: '#ffffff' }}>
              Conversor .CROQUI
            </h1>
            <span className="badge badge-success" style={{ fontSize: '11px' }}>
              Disponível
            </span>
          </div>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Transforme imagens rasterizadas (fotos aéreas, ortofotos, mapas) em arquivos compatíveis com o formato .croqui.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => navigate('/guides/croqui-converter')}
            className="btn btn-outline"
            style={{ fontSize: '12px', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <HelpCircle size={14} /> Como usar (Tutorial)
          </button>
          
          {/* Privacy badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              fontSize: '12px',
              fontWeight: 600,
              color: 'var(--success-text)',
            }}
          >
            <ShieldCheck size={16} />
            <span style={{ display: 'none' }} className="hide-on-mobile">Processamento Local e Privado</span>
          </div>
        </div>
      </div>

      {/* Grid Principal do Conversor */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 1fr)',
          gap: '28px',
          alignItems: 'start',
        }}
        className="converter-grid"
      >
        {/* Painel Esquerdo: Formulário, Upload e Configurações */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <section className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-main)' }}>
                1. Seleção de Imagem
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>
                Selecione o arquivo de mapa ou ortofoto que servirá de base.
              </p>
            </div>

            <div data-guide="upload">
              <ImageUploader
                selectedMeta={selectedMeta}
                onImageLoaded={handleImageLoaded}
                onClear={handleClear}
                onError={(msg) => setErrorMessage(msg)}
              />
            </div>

            {/* Mensagem de Erro, se houver */}
            {errorMessage && (
              <div
                style={{
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--danger-bg)',
                  border: '1px solid var(--danger-border)',
                  color: 'var(--danger-text)',
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <AlertCircle size={18} style={{ flexShrink: 0 }} />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Configurações Avançadas */}
            <div data-guide="settings">
              <div style={{ marginBottom: '10px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-main)' }}>
                  2. Parâmetros de Exportação
                </h3>
              </div>
              <ConverterConfig options={options} onChange={setOptions} />
            </div>

            {/* Ação Principal: Gerar .CROQUI */}
            <div>
              <button
                type="button"
                data-guide="generate"
                onClick={handleGenerate}
                disabled={!selectedImage || isProcessing}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  padding: '14px',
                  fontSize: '15px',
                  fontWeight: 700,
                  letterSpacing: '0.01em',
                }}
              >
                <Zap size={18} />
                <span>{isProcessing ? 'Processando Imagem...' : 'Gerar .CROQUI'}</span>
              </button>

              {predictedDimensions && !conversionResult && (
                <p
                  style={{
                    fontSize: '12px',
                    color: 'var(--text-dim)',
                    textAlign: 'center',
                    marginTop: '8px',
                  }}
                >
                  Saída estimada: {predictedDimensions.width} × {predictedDimensions.height} px (escala {Math.round(predictedDimensions.scale * 100)}%)
                </p>
              )}
            </div>

            {/* Resultado da Conversão */}
            {conversionResult && (
              <div data-guide="result">
                <ConverterResult result={conversionResult} onReset={handleClear} />
              </div>
            )}
          </section>

          {/* Card Informativo de Privacidade e Uso */}
          <div
            style={{
              padding: '16px 20px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
              fontSize: '12px',
              color: 'var(--text-dim)',
              lineHeight: 1.6,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', color: 'var(--text-muted)' }}>
              <HelpCircle size={15} color="var(--primary-400)" />
              <strong style={{ color: 'var(--text-main)' }}>Como utilizar o arquivo gerado:</strong>
            </div>
            <ol style={{ paddingLeft: '20px', marginTop: '6px' }}>
              <li>Baixe o arquivo <code style={{ color: 'var(--primary-300)' }}>.croqui</code> gerado localmente.</li>
              <li>No sistema LPST (ou editor compatível com Fabric.js), abra o módulo de desenho.</li>
              <li>Utilize a opção <strong>Importar Croqui</strong> e escolha o arquivo baixado. A imagem será carregada preservando o alinhamento em 0,0.</li>
            </ol>
            <p style={{ marginTop: '8px', fontSize: '11px', color: 'var(--text-dim)' }}>
              <strong>Garantia de Privacidade:</strong> A imagem é processada no próprio navegador e não é enviada para servidores da Atratora Forge ou terceiros.
            </p>
          </div>
        </div>

        {/* Painel Direito: Pré-visualização Grande */}
        <section
          className="card"
          data-guide="preview"
          style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '560px',
            padding: '20px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
              marginBottom: '16px',
              paddingBottom: '12px',
              borderBottom: '1px solid var(--border-subtle)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Eye size={18} color="var(--primary-400)" />
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-main)' }}>
                Pré-visualização
              </h3>
            </div>

            {selectedMeta && (
              <span style={{ fontSize: '12px', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                Original: {selectedMeta.naturalWidth} × {selectedMeta.naturalHeight} px
              </span>
            )}
          </div>

          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'var(--bg-primary)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              overflow: 'hidden',
              position: 'relative',
              minHeight: '440px',
              padding: '16px',
            }}
          >
            {selectedMeta ? (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img
                  src={selectedMeta.previewUrl}
                  alt="Pré-visualização do Croqui"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '480px',
                    objectFit: 'contain',
                    borderRadius: 'var(--radius-sm)',
                    boxShadow: 'var(--shadow-lg)',
                  }}
                />
              </div>
            ) : (
              /* Estado Vazio Premium */
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  padding: '40px 20px',
                  color: 'var(--text-dim)',
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--bg-tertiary)',
                    border: '1px dashed var(--border-default)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-dim)',
                    marginBottom: '16px',
                  }}
                >
                  <FileImage size={30} />
                </div>
                <h4 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-muted)' }}>
                  Nenhuma imagem carregada
                </h4>
                <p style={{ fontSize: '13px', maxWidth: '280px', marginTop: '6px', lineHeight: 1.4 }}>
                  Selecione ou arraste um arquivo no painel ao lado para visualizar a imagem que será encapsulada no croqui.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .converter-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 768px) {
          .hide-on-mobile {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};
