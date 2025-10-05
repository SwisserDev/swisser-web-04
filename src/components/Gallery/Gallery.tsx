import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '../../lib/gsap-config'
import siteConfig from '../../config/site.config.json'
import { type GalleryImage, type GalleryCategory } from '../../types/config'
import { X, ChevronLeft, ChevronRight, Maximize2, Camera } from 'lucide-react'

export const Gallery = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  const filteredImages = selectedCategory === 'all'
    ? siteConfig.gallery.images
    : siteConfig.gallery.images.filter((img: GalleryImage) => img.category === selectedCategory)

  // Group images by featured status
  const featuredImages = filteredImages.filter((img: GalleryImage) => img.featured)
  const regularImages = filteredImages.filter((img: GalleryImage) => !img.featured)

  useGSAP(() => {
    // Header animation
    ScrollTrigger.create({
      trigger: titleRef.current,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.from('.gallery-header', {
          x: -30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out'
        })
      }
    })

    // Gallery items animation
    const items = galleryRef.current?.querySelectorAll('.gallery-item')
    if (items && items.length > 0) {
      ScrollTrigger.batch(items, {
        onEnter: (elements) => {
          gsap.from(elements, {
            scale: 0.95,
            opacity: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power3.out'
          })
        },
        once: true,
        start: 'top 85%'
      })
    }
  }, [selectedCategory])

  const handleImageClick = (index: number) => {
    setSelectedImage(index)
    setIsLightboxOpen(true)
  }

  const handlePrevious = () => {
    if (selectedImage === null) return
    const newIndex = selectedImage === 0 ? filteredImages.length - 1 : selectedImage - 1
    setSelectedImage(newIndex)
  }

  const handleNext = () => {
    if (selectedImage === null) return
    const newIndex = selectedImage === filteredImages.length - 1 ? 0 : selectedImage + 1
    setSelectedImage(newIndex)
  }

  const closeLightbox = () => {
    setIsLightboxOpen(false)
    setTimeout(() => setSelectedImage(null), 300)
  }

  return (
    <>
      <section ref={sectionRef} id="gallery" className="section-padding bg-gta-panel relative overflow-hidden">
        {/* Diagonal stripes overlay */}
        <div className="absolute inset-0 bg-diagonal-stripes opacity-30" />

        <div className="container-gta relative z-10">
          {/* Section header - GTA V Style */}
          <div ref={titleRef} className="mb-16">
            <div className="gallery-header inline-block bg-accent-yellow px-4 py-1 mb-4">
              <span className="font-ui text-xs uppercase tracking-wider text-gta-black font-bold flex items-center gap-2">
                <Camera className="w-3 h-3" />
                {siteConfig.ui?.gallery?.sectionTag || 'SnapMatic'}
              </span>
            </div>

            <h2 className="gallery-header font-display text-6xl md:text-7xl lg:text-8xl text-gta-white uppercase leading-none mb-4">
              {siteConfig.ui?.gallery?.title || 'Media'}{' '}
              <span className="text-accent-blue">{siteConfig.ui?.gallery?.titleAccent || 'Gallery'}</span>
            </h2>

            <p className="gallery-header font-body text-gta-gray-light text-lg max-w-2xl mb-6">
              {siteConfig.ui?.gallery?.subtitle || 'Captured moments from our server.'}
            </p>

            <div className="gallery-header h-1 w-24 bg-accent-blue" />
          </div>

          {/* Category tabs - GTA V HUD style */}
          <div className="mb-12">
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
              {siteConfig.gallery.categories.map((category: GalleryCategory) => {
                const imageCount = category.id === 'all'
                  ? siteConfig.gallery.images.length
                  : siteConfig.gallery.images.filter((img: GalleryImage) => img.category === category.id).length

                const isActive = selectedCategory === category.id

                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`
                      font-heading text-sm uppercase tracking-wider whitespace-nowrap
                      px-6 py-3 transition-all duration-200
                      ${
                        isActive
                          ? 'bg-accent-blue text-gta-black border-l-4 border-accent-yellow'
                          : 'bg-gta-panel-light text-gta-gray-light border-l-4 border-transparent hover:bg-gta-black hover:text-gta-white'
                      }
                    `}
                  >
                    {category.name}
                    <span className="ml-2 font-mono text-xs">
                      ({imageCount})
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Gallery Grid - GTA V SnapMatic style */}
          <div ref={galleryRef}>
            {/* Featured images - Large showcase */}
            {featuredImages.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-[2px] w-12 bg-accent-yellow" />
                  <h3 className="font-ui text-xs uppercase tracking-wider text-accent-yellow">
                    Featured Shots
                  </h3>
                  <div className="flex-1 h-[2px] bg-gta-panel-light" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {featuredImages.slice(0, 2).map((image: GalleryImage) => {
                    const imageIndex = filteredImages.findIndex((img: GalleryImage) => img.id === image.id)

                    return (
                      <article
                        key={image.id}
                        className="gallery-item group cursor-pointer"
                        onClick={() => handleImageClick(imageIndex)}
                      >
                        <div className="relative overflow-hidden bg-gta-black border-l-4 border-accent-blue">
                          <div className="aspect-[16/9]">
                            <img
                              src={image.src}
                              alt={image.alt || image.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          </div>

                          {/* Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-gta-black via-gta-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                          {/* Content */}
                          <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                            <h4 className="font-heading text-2xl text-gta-white uppercase mb-2 font-bold">
                              {image.title}
                            </h4>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs text-accent-blue uppercase tracking-wider">
                                {siteConfig.ui?.gallery?.evidencePrefix || 'IMG #'}
                                {image.id.toString().padStart(4, '0')}
                              </span>
                              <span className="text-gta-gray-light">•</span>
                              <span className="font-ui text-xs text-gta-gray-light uppercase">
                                {image.category}
                              </span>
                            </div>
                          </div>

                          {/* Featured badge */}
                          <div className="absolute top-4 right-4">
                            <span className="bg-accent-yellow text-gta-black px-3 py-1 font-ui text-xs uppercase tracking-wider font-bold">
                              {siteConfig.ui?.gallery?.featuredBadge || 'Featured'}
                            </span>
                          </div>

                          {/* Expand icon */}
                          <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="p-2 bg-gta-panel/90 backdrop-blur-sm">
                              <Maximize2 className="w-5 h-5 text-accent-blue" />
                            </div>
                          </div>
                        </div>
                      </article>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Regular images - Grid layout */}
            {regularImages.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-[2px] w-12 bg-gta-panel-light" />
                  <h3 className="font-ui text-xs uppercase tracking-wider text-gta-gray-light">
                    All Photos
                  </h3>
                  <div className="flex-1 h-[2px] bg-gta-panel-light" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {regularImages.map((image: GalleryImage) => {
                    const imageIndex = filteredImages.findIndex((img: GalleryImage) => img.id === image.id)

                    return (
                      <article
                        key={image.id}
                        className="gallery-item group cursor-pointer"
                        onClick={() => handleImageClick(imageIndex)}
                      >
                        <div className="relative overflow-hidden bg-gta-black border-l-2 border-gta-panel-light hover:border-accent-blue transition-colors duration-300">
                          <div className="aspect-square">
                            <img
                              src={image.src}
                              alt={image.alt || image.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          </div>

                          {/* Overlay on hover */}
                          <div className="absolute inset-0 bg-gta-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
                            <Maximize2 className="w-6 h-6 text-accent-blue" />
                            <span className="font-mono text-xs text-gta-white">
                              #{image.id.toString().padStart(4, '0')}
                            </span>
                          </div>
                        </div>
                      </article>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Total count */}
            <div className="mt-12 text-center">
              <p className="font-mono text-xs uppercase tracking-wider text-accent-blue">
                {filteredImages.length} {filteredImages.length === 1 ? 'Photo' : 'Photos'} •
                {selectedCategory === 'all' ? ' All Categories' : ` ${siteConfig.gallery.categories.find((c: GalleryCategory) => c.id === selectedCategory)?.name}`}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox - GTA V Fullscreen Viewer */}
      {isLightboxOpen && selectedImage !== null && (
        <div className="fixed inset-0 z-[200] bg-gta-black/98 backdrop-blur-xl flex items-center justify-center animate-fade-in">
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-8 right-8 p-3 bg-gta-panel hover:bg-accent-red text-gta-white hover:text-gta-black transition-all duration-200 z-10"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation arrows */}
          <button
            onClick={handlePrevious}
            className="absolute left-8 top-1/2 -translate-y-1/2 p-4 bg-gta-panel hover:bg-accent-blue text-gta-white hover:text-gta-black transition-all duration-200"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-8 top-1/2 -translate-y-1/2 p-4 bg-gta-panel hover:bg-accent-blue text-gta-white hover:text-gta-black transition-all duration-200"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image container */}
          <div className="relative max-w-[90vw] max-h-[90vh]">
            <img
              src={filteredImages[selectedImage].src}
              alt={filteredImages[selectedImage].alt || filteredImages[selectedImage].title}
              className="w-full h-full object-contain"
            />

            {/* Image info - GTA V HUD style */}
            <div className="absolute bottom-0 left-0 right-0 bg-gta-panel/95 backdrop-blur-sm border-t-2 border-accent-blue p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-heading text-2xl text-gta-white uppercase mb-2 font-bold">
                    {filteredImages[selectedImage].title}
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm text-accent-blue">
                      {siteConfig.ui?.gallery?.evidencePrefix || 'IMG #'}
                      {filteredImages[selectedImage].id.toString().padStart(4, '0')}
                    </span>
                    <span className="text-gta-gray-light">•</span>
                    <span className="font-ui text-sm text-gta-gray-light uppercase">
                      {filteredImages[selectedImage].category}
                    </span>
                    {filteredImages[selectedImage].featured && (
                      <>
                        <span className="text-gta-gray-light">•</span>
                        <span className="font-ui text-sm text-accent-yellow uppercase">Featured</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="font-mono text-sm text-gta-gray-light">
                  {selectedImage + 1} / {filteredImages.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
