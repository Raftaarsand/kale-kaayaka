import type { Language } from '../types/models'

export type Messages = {
  skip: string
  discover: string
  myCrafts: string
  orders: string
  language: string
  openMenu: string
  closeMenu: string
  heroSentence: string
  browseCrafts: string
  listCraft: string
  shelfCount: string
  howTitle: string
  howOne: string
  howTwo: string
  howThree: string
  searchLabel: string
  searchPlaceholder: string
  allCrafts: string
  catTextile: string
  catBasketry: string
  catCoconut: string
  catWood: string
  results: string
  noResults: string
  clearSearch: string
  sampleNote: string
  viewDetails: string
  buyNow: string
  soldOut: string
  backDiscover: string
  materials: string
  availability: string
  madeToOrder: string
  fulfilment: string
  inStock: string
  story: string
  makingVideo: string
  noVideo: string
  watchVideo: string
  whyPrice: string
  passportAction: string
  makeOffer: string
  priceDisclaimer: string
  makerEarnings: string
  labourLine: string
  craftPremium: string
  packaging: string
  platformFee: string
  listedPrice: string
  pricePartsNote: string
  close: string
  offerTitle: string
  offerHelp: string
  offerAmount: string
  submitOffer: string
  offerAccepted: string
  offerTooLow: string
  offerTooHigh: string
  offerInvalid: string
  continueCheckout: string
  passportKicker: string
  passportDisclaimer: string
  passportId: string
  makerDeclared: string
  region: string
  process: string
  qrTitle: string
  qrLocalhost: string
  copyLink: string
  copied: string
  copyFailed: string
  backToProduct: string
  notForSale: string
  missingTitle: string
  missingBody: string
  dashboardTitle: string
  dashboardLead: string
  publishedCount: string
  orderCount: string
  addCraft: string
  edit: string
  publish: string
  unpublish: string
  offersOn: string
  offersOff: string
  minimumOffer: string
  changeOffers: string
  recentOrders: string
  viewAllOrders: string
  noOrders: string
  offerOutcomes: string
  noOfferOutcomes: string
  offerAcceptedShort: string
  offerRejectedShort: string
  resetDemo: string
  resetTitle: string
  resetBody: string
  resetConfirm: string
  cancel: string
  resetDone: string
  storageError: string
  recoveredNote: string
  stepDetails: string
  stepPrice: string
  stepPreview: string
  formLead: string
  productName: string
  makerName: string
  category: string
  chooseCategory: string
  productImage: string
  imageHint: string
  preparingImage: string
  description: string
  craftStory: string
  videoUrl: string
  videoHint: string
  voiceHint: string
  voiceDisclosure: string
  speak: string
  listening: string
  stopListening: string
  voiceSuccess: string
  voiceUnsupported: string
  voiceDenied: string
  voiceNoSpeech: string
  voiceNoMic: string
  voiceNetwork: string
  voiceUnknown: string
  hearing: string
  numbersTyped: string
  labourHours: string
  hourlyRate: string
  wageHint: string
  materialCost: string
  packagingCost: string
  premiumHint: string
  feeHint: string
  useSuggestedFee: string
  customFee: string
  quantity: string
  fulfilmentDays: string
  enableOffers: string
  floorExplain: string
  minimumPrice: string
  continue: string
  back: string
  previewLead: string
  previewActions: string
  confirmListing: string
  publishListing: string
  saveListing: string
  publishedBanner: string
  updatedBanner: string
  errRequired: string
  errTooLong: string
  errCategory: string
  errImage: string
  errImageType: string
  errImageLarge: string
  errImageRead: string
  errHours: string
  errMoney: string
  errTooHigh: string
  errPrice: string
  errVideo: string
  errQuantity: string
  errFulfilment: string
  errMinFloor: string
  errMinList: string
  errConfirm: string
  checkoutTitle: string
  checkoutLead: string
  reviewOrder: string
  agreedOffer: string
  listedInstead: string
  clearOffer: string
  invalidOfferNotice: string
  qtyLabel: string
  onlyLeft: string
  deliveryDetails: string
  buyerName: string
  phone: string
  address: string
  city: string
  pincode: string
  placeOrder: string
  noPayment: string
  errPhone: string
  errPincode: string
  errStock: string
  errUnavailable: string
  errOfferCheckout: string
  orderPlaced: string
  orderReference: string
  viewOrder: string
  demoOnly: string
  breakdownAtPurchase: string
  agreedTotal: string
  statusConfirmed: string
  statusPreparing: string
  statusReady: string
  advanceStatus: string
  fromOffer: string
  listedPurchase: string
  ordersLead: string
  orderMissing: string
  footerNote: string
  photoCredit: string
  notFoundTitle: string
  notFoundBody: string
  loadingImage: string
  perPiece: string
  home: string
  mainNav: string
}

const en: Messages = {
  skip: 'Skip to content',
  discover: 'Discover',
  myCrafts: 'My Crafts',
  orders: 'Orders',
  language: 'Language',
  openMenu: 'Open menu',
  closeMenu: 'Close menu',
  heroSentence:
    'Kale Kaayaka helps local artisans list handmade work in Kannada or English, explain its cost, and take direct orders from buyers.',
  browseCrafts: 'Browse handmade crafts',
  listCraft: 'List your craft',
  shelfCount: '{count} listings on the shelf',
  howTitle: 'A price you can read',
  howOne: 'The maker enters hours, a wage, materials and a craft premium.',
  howTwo: 'The listed price is that sum, plus one fixed platform fee.',
  howThree: 'Buyers can open the breakdown before they order.',
  searchLabel: 'Search products or makers',
  searchPlaceholder: 'Kasuti, basket, coconut, or a maker',
  allCrafts: 'All crafts',
  catTextile: 'Textiles',
  catBasketry: 'Basketry',
  catCoconut: 'Coconut shell',
  catWood: 'Wood craft',
  results: '{count} crafts',
  noResults: 'No crafts match that search.',
  clearSearch: 'Clear search',
  sampleNote:
    'Listings shipped with this demo are fictional examples for DevHost 2026. The people, prices and stock are not verified sellers or partnerships. Photographs are reference images, credited in the README.',
  viewDetails: 'View details',
  buyNow: 'Buy now',
  soldOut: 'Sold out',
  backDiscover: 'Back to Discover',
  materials: 'Materials',
  availability: 'Availability',
  madeToOrder: 'Made to order',
  fulfilment: 'About {days} days to make',
  inStock: '{count} available',
  story: 'Craft story',
  makingVideo: 'Making process',
  noVideo: 'No making video has been added for this piece.',
  watchVideo: 'Open the making video',
  whyPrice: 'Why this price?',
  passportAction: 'Craft Passport and QR',
  makeOffer: 'Make an offer',
  priceDisclaimer:
    'This is a suggested price from figures the maker confirmed. It is not an independent guarantee that the price is fair.',
  makerEarnings: 'Maker earnings',
  labourLine: 'Labour, {hours} h × {wage}',
  craftPremium: 'Craft premium',
  packaging: 'Packaging and logistics',
  platformFee: 'Platform fee',
  listedPrice: 'Listed price',
  pricePartsNote:
    'Maker earnings, materials, packaging and the platform fee add up to the listed price. Labour and the craft premium sit inside maker earnings, so they are not added again.',
  close: 'Close',
  offerTitle: 'Make an offer',
  offerHelp: 'Offers at or above {minimum} are accepted straight away, up to the listed price of {listed}.',
  offerAmount: 'Your proposed price',
  submitOffer: 'Check this offer',
  offerAccepted: 'Accepted at {price}. Stock is not held until you place the demo order.',
  offerTooLow: 'That offer is below the lowest price the maker set, {minimum}. Try a higher amount, or buy at the listed price.',
  offerTooHigh: 'That is above the listed price of {listed}. Use Buy now to purchase at the listed price.',
  offerInvalid: 'Enter a whole amount in rupees.',
  continueCheckout: 'Continue to demo checkout',
  passportKicker: 'Maker-declared record',
  passportDisclaimer:
    'The maker wrote this passport. The QR code only opens this page. It does not verify authenticity, and it does not mean the piece is GI-certified.',
  passportId: 'Passport ID',
  makerDeclared: 'Declared by the maker',
  region: 'Region',
  process: 'Making notes',
  qrTitle: 'Passport QR',
  qrLocalhost:
    'This QR points at a localhost address. A phone on another network cannot open it. Deploy the site, or scan it on this computer, to reach the passport.',
  copyLink: 'Copy passport link',
  copied: 'Link copied',
  copyFailed: 'Could not copy. Select the link and copy it yourself.',
  backToProduct: 'Back to the product',
  notForSale: 'This listing is not currently on the storefront.',
  missingTitle: 'This craft is not on the shelf',
  missingBody: 'The link may be old, or the listing was removed from this browser.',
  dashboardTitle: 'My Crafts',
  dashboardLead: 'Publish a listing, check the price, and see demo orders. This browser is the whole workshop. There is no account.',
  publishedCount: '{count} published',
  orderCount: '{count} demo orders',
  addCraft: 'Add a craft',
  edit: 'Edit',
  publish: 'Publish',
  unpublish: 'Unpublish',
  offersOn: 'Offers on',
  offersOff: 'Offers off',
  minimumOffer: 'Minimum {price}',
  changeOffers: 'Change price and offer rules',
  recentOrders: 'Incoming demo orders',
  viewAllOrders: 'View all orders',
  noOrders: 'No demo orders yet. A buyer order will appear here after checkout.',
  offerOutcomes: 'Offer outcomes',
  noOfferOutcomes: 'No offers yet. Accepted and rejected offers are listed here. You do not have to approve each one.',
  offerAcceptedShort: 'Accepted',
  offerRejectedShort: 'Rejected',
  resetDemo: 'Reset demo data',
  resetTitle: 'Reset this browser’s demo?',
  resetBody: 'This removes crafts you added and all demo orders, then restores the four sample listings.',
  resetConfirm: 'Reset demo data',
  cancel: 'Cancel',
  resetDone: 'Sample listings are restored.',
  storageError: 'This browser could not save the demo data. Try a smaller photo, or reset the demo data.',
  recoveredNote: 'Saved demo data could not be read, so the sample listings were restored.',
  stepDetails: 'Details',
  stepPrice: 'Price',
  stepPreview: 'Preview',
  formLead: 'Enter the piece, review the price, then publish. Nothing goes live until you confirm.',
  productName: 'Product name',
  makerName: 'Maker name',
  category: 'Craft category',
  chooseCategory: 'Choose a category',
  productImage: 'Product image',
  imageHint: 'JPG, PNG or WebP. The photo is resized in this browser and kept only on this device.',
  preparingImage: 'Preparing the photo…',
  description: 'Short description',
  craftStory: 'Craft story',
  videoUrl: 'Making video URL',
  videoHint: 'Optional. A YouTube link can play on the product page. Leave this blank if you have no video.',
  voiceHint: 'Voice uses the language selected in the header. You can edit the text before publishing.',
  voiceDisclosure:
    'The microphone uses this browser’s Web Speech API. In Chrome, audio may go to the browser vendor’s speech service. Kale Kaayaka does not upload audio to its own server. You can always type.',
  speak: 'Speak',
  listening: 'Listening…',
  stopListening: 'Stop listening',
  voiceSuccess: 'Speech was added to the field. Edit it before you publish.',
  voiceUnsupported: 'This browser does not support speech recognition. Type in the field instead.',
  voiceDenied: 'Microphone permission was denied. Type in the field instead.',
  voiceNoSpeech: 'No speech was heard. Try again, or type the text.',
  voiceNoMic: 'No microphone was found. Type in the field instead.',
  voiceNetwork: 'Speech recognition could not reach the browser speech service. Type the text instead.',
  voiceUnknown: 'Speech recognition stopped unexpectedly. You can type instead.',
  hearing: 'Hearing: {text}',
  numbersTyped: 'Hours, wages and costs stay typed. Speech cannot fill those in.',
  labourHours: 'Labour hours',
  hourlyRate: 'Hourly labour rate',
  wageHint: 'Choose a rate, then change the number if your usual wage is different. The listing uses the figure in the field.',
  materialCost: 'Material cost',
  packagingCost: 'Packaging and logistics',
  premiumHint: 'An extra amount for the skill in the piece. It is part of maker earnings, not a second labour charge.',
  feeHint: 'The platform fee is a fixed amount, added once. The suggestion is {percent}% of the subtotal before the fee ({amount}).',
  useSuggestedFee: 'Use the suggested fee',
  customFee: 'You are using your own fee.',
  quantity: 'Available quantity',
  fulfilmentDays: 'Days to make',
  enableOffers: 'Accept offers automatically',
  floorExplain: 'The lowest allowed minimum is {floor}. That covers labour, materials, packaging and the platform fee. An offer cannot go below it, and it cannot go above the listed price.',
  minimumPrice: 'Minimum acceptable offer',
  continue: 'Continue',
  back: 'Back',
  previewLead: 'This is the card buyers will see, and the price they will be asked to pay.',
  previewActions: 'View and buy actions start working after you publish.',
  confirmListing: 'I confirm this listing and the suggested price of {price}.',
  publishListing: 'Publish listing',
  saveListing: 'Save and publish',
  publishedBanner: 'Published. This listing is now on Discover.',
  updatedBanner: 'Saved. The storefront is using this price and these details.',
  errRequired: 'Enter this to continue.',
  errTooLong: 'This is too long. Shorten it a little.',
  errCategory: 'Choose a craft category.',
  errImage: 'Add a product photo.',
  errImageType: 'Use a JPG, PNG or WebP photo.',
  errImageLarge: 'That photo is still too large after resizing. Try a smaller one.',
  errImageRead: 'That photo could not be read. Try a different file.',
  errHours: 'Enter hours as a number, such as 6 or 2.5.',
  errMoney: 'Enter a whole amount in rupees, zero or more.',
  errTooHigh: 'That figure is above the limit for this demo.',
  errPrice: 'The price could not be calculated. Check the figures.',
  errVideo: 'Enter a full http or https link, or leave this blank.',
  errQuantity: 'Enter how many pieces are available, from 1 to 99.',
  errFulfilment: 'Enter the days needed to make it, from 1 to 180.',
  errMinFloor: 'The minimum must be at least {floor}, the labour and cost floor plus the platform fee.',
  errMinList: 'The minimum cannot be higher than the listed price.',
  errConfirm: 'Confirm the listing and the price before publishing.',
  checkoutTitle: 'Review this demo order',
  checkoutLead: 'Check the piece, the price and a delivery note. No real payment is taken.',
  reviewOrder: 'Order',
  agreedOffer: 'Accepted offer, {price} each',
  listedInstead: 'Buy at the listed price instead',
  clearOffer: 'Remove the accepted offer',
  invalidOfferNotice: 'That offer is no longer valid, so this checkout uses the listed price.',
  qtyLabel: 'Quantity',
  onlyLeft: 'Only {count} left.',
  deliveryDetails: 'Delivery details',
  buyerName: 'Your name',
  phone: 'Mobile number',
  address: 'Address',
  city: 'City or town',
  pincode: 'PIN code',
  placeOrder: 'Place demo order',
  noPayment: 'No payment will be charged. This creates a demo order on this device.',
  errPhone: 'Enter a 10-digit mobile number.',
  errPincode: 'Enter a 6-digit PIN code.',
  errStock: 'Only {count} are available.',
  errUnavailable: 'This piece is not available to order.',
  errOfferCheckout: 'The offer could not be used. Refresh the product and try again.',
  orderPlaced: 'Demo order placed',
  orderReference: 'Order reference',
  viewOrder: 'View in Orders',
  demoOnly: 'This is a simulated order. Nothing was paid, and nothing will be shipped.',
  breakdownAtPurchase: 'Price breakdown saved with this order',
  agreedTotal: 'Agreed total',
  statusConfirmed: 'Confirmed',
  statusPreparing: 'Preparing',
  statusReady: 'Ready for handover',
  advanceStatus: 'Mark as {status}',
  fromOffer: 'Accepted offer',
  listedPurchase: 'Listed price',
  ordersLead: 'Demo orders stay in this browser. The price on each order is the one agreed at checkout.',
  orderMissing: 'That order is not in this browser.',
  footerNote: 'Kale Kaayaka is a DevHost 2026 student prototype. Demo orders do not take payment, and there is no production login.',
  photoCredit: 'Sample photographs are reference images. Credits are in the README.',
  notFoundTitle: 'This page is not part of the workshop',
  notFoundBody: 'Use Discover to see the crafts currently on the shelf.',
  loadingImage: 'Preparing the photo',
  perPiece: 'each',
  home: 'Kale Kaayaka home',
  mainNav: 'Main',
}

const kn: Messages = {
  skip: 'ಮುಖ್ಯ ವಿಷಯಕ್ಕೆ ಹೋಗಿ',
  discover: 'ಅನ್ವೇಷಿಸಿ',
  myCrafts: 'ನನ್ನ ಕರಕುಶಲ',
  orders: 'ಆದೇಶಗಳು',
  language: 'ಭಾಷೆ',
  openMenu: 'ಮೆನು ತೆರೆಯಿರಿ',
  closeMenu: 'ಮೆನು ಮುಚ್ಚಿ',
  heroSentence:
    'ಕಲೆ ಕಾಯಕ ಸ್ಥಳೀಯ ಕರಕುಶಲಿಗರಿಗೆ ಕನ್ನಡ ಅಥವಾ ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ತಮ್ಮ ಕೆಲಸವನ್ನು ಪಟ್ಟಿ ಮಾಡಲು, ಅದರ ಬೆಲೆಯನ್ನು ವಿವರಿಸಲು ಮತ್ತು ಖರೀದಿದಾರರಿಂದ ನೇರ ಆದೇಶ ಪಡೆಯಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.',
  browseCrafts: 'ಕೈಯಿಂದ ಮಾಡಿದ ಕರಕುಶಲ ನೋಡಿ',
  listCraft: 'ನಿಮ್ಮ ಕರಕುಶಲ ಪಟ್ಟಿ ಮಾಡಿ',
  shelfCount: 'ಶೆಲ್ಫ್‌ನಲ್ಲಿ {count} ಪಟ್ಟಿಗಳು',
  howTitle: 'ಓದಬಹುದಾದ ಬೆಲೆ',
  howOne: 'ಕರ್ತೃ ಗಂಟೆಗಳು, ಕೂಲಿ, ಸಾಮಗ್ರಿ ಮತ್ತು ಕರಕುಶಲ ಮೌಲ್ಯವನ್ನು ನಮೂದಿಸುತ್ತಾರೆ.',
  howTwo: 'ಪಟ್ಟಿ ಬೆಲೆ ಆ ಮೊತ್ತ, ಜೊತೆಗೆ ಒಂದು ನಿಗದಿ ವೇದಿಕೆ ಶುಲ್ಕ.',
  howThree: 'ಖರೀದಿಸುವ ಮೊದಲು ಖರೀದಿದಾರರು ವಿಭಜನೆಯನ್ನು ತೆರೆಯಬಹುದು.',
  searchLabel: 'ಉತ್ಪನ್ನ ಅಥವಾ ಕರ್ತೃ ಹುಡುಕಿ',
  searchPlaceholder: 'ಕಸೂತಿ, ಬುಟ್ಟಿ, ತೆಂಗಿನ ಚಿಪ್ಪು ಅಥವಾ ಕರ್ತೃ',
  allCrafts: 'ಎಲ್ಲ ಕರಕುಶಲ',
  catTextile: 'ಬಟ್ಟೆ',
  catBasketry: 'ಬುಟ್ಟಿ',
  catCoconut: 'ತೆಂಗಿನ ಚಿಪ್ಪು',
  catWood: 'ಮರದ ಕೆಲಸ',
  results: '{count} ಕರಕುಶಲ',
  noResults: 'ಆ ಹುಡುಕಾಟಕ್ಕೆ ಕರಕುಶಲ ಸಿಗಲಿಲ್ಲ.',
  clearSearch: 'ಹುಡುಕಾಟ ಅಳಿಸಿ',
  sampleNote:
    'ಈ ಡೆಮೊದೊಂದಿಗೆ ಬಂದ ಪಟ್ಟಿಗಳು DevHost 2026 ಗಾಗಿ ಕಲ್ಪಿತ ಉದಾಹರಣೆಗಳು. ಜನರು, ಬೆಲೆಗಳು ಮತ್ತು ದಾಸ್ತಾನು ಪರಿಶೀಲಿತ ಮಾರಾಟಗಾರರು ಅಲ್ಲ. ಫೋಟೋಗಳು ಉಲ್ಲೇಖ ಚಿತ್ರಗಳು. ಮೂಲ README ನಲ್ಲಿದೆ.',
  viewDetails: 'ವಿವರ ನೋಡಿ',
  buyNow: 'ಈಗ ಖರೀದಿಸಿ',
  soldOut: 'ಮಾರಾಟವಾಗಿದೆ',
  backDiscover: 'ಅನ್ವೇಷಣೆಗೆ ಹಿಂದಿರುಗಿ',
  materials: 'ಸಾಮಗ್ರಿ',
  availability: 'ಲಭ್ಯತೆ',
  madeToOrder: 'ಆದೇಶದ ಮೇರೆಗೆ ತಯಾರಿ',
  fulfilment: 'ತಯಾರಿಸಲು ಸುಮಾರು {days} ದಿನ',
  inStock: '{count} ಲಭ್ಯ',
  story: 'ಕರಕುಶಲ ಕಥೆ',
  makingVideo: 'ತಯಾರಿಕೆಯ ವಿಧಾನ',
  noVideo: 'ಈ ತುಣುಕಿಗೆ ತಯಾರಿಕೆಯ ವೀಡಿಯೊ ಸೇರಿಸಿಲ್ಲ.',
  watchVideo: 'ತಯಾರಿಕೆಯ ವೀಡಿಯೊ ತೆರೆಯಿರಿ',
  whyPrice: 'ಈ ಬೆಲೆ ಏಕೆ?',
  passportAction: 'ಕರಕುಶಲ ಪಾಸ್‌ಪೋರ್ಟ್ ಮತ್ತು QR',
  makeOffer: 'ಆಫರ್ ಮಾಡಿ',
  priceDisclaimer:
    'ಇದು ಕರ್ತೃ ದೃಢಪಡಿಸಿದ ಅಂಕಿಗಳಿಂದ ಬಂದ ಸೂಚಿತ ಬೆಲೆ. ಬೆಲೆ ನ್ಯಾಯವೆಂದು ಸ್ವತಂತ್ರ ಖಾತರಿ ಅಲ್ಲ.',
  makerEarnings: 'ಕರ್ತೃಗಳ ಗಳಿಕೆ',
  labourLine: 'ದುಡಿಮೆ, {hours} ಗಂ × {wage}',
  craftPremium: 'ಕರಕುಶಲ ಮೌಲ್ಯ',
  packaging: 'ಪ್ಯಾಕಿಂಗ್ ಮತ್ತು ಸಾಗಣೆ',
  platformFee: 'ವೇದಿಕೆ ಶುಲ್ಕ',
  listedPrice: 'ಪಟ್ಟಿ ಬೆಲೆ',
  pricePartsNote:
    'ಕರ್ತೃಗಳ ಗಳಿಕೆ, ಸಾಮಗ್ರಿ, ಪ್ಯಾಕಿಂಗ್ ಮತ್ತು ವೇದಿಕೆ ಶುಲ್ಕ ಸೇರಿ ಪಟ್ಟಿ ಬೆಲೆಯಾಗುತ್ತದೆ. ದುಡಿಮೆ ಮತ್ತು ಕರಕುಶಲ ಮೌಲ್ಯ ಗಳಿಕೆಯ ಒಳಗೆ ಇವೆ. ಅವನ್ನು ಮತ್ತೆ ಸೇರಿಸುವುದಿಲ್ಲ.',
  close: 'ಮುಚ್ಚಿ',
  offerTitle: 'ಆಫರ್ ಮಾಡಿ',
  offerHelp: '{minimum} ಅಥವಾ ಅದಕ್ಕಿಂತ ಹೆಚ್ಚಿನ ಆಫರ್ ತಕ್ಷಣ ಸ್ವೀಕಾರವಾಗುತ್ತದೆ. ಪಟ್ಟಿ ಬೆಲೆ {listed}.',
  offerAmount: 'ನೀವು ಸೂಚಿಸುವ ಬೆಲೆ',
  submitOffer: 'ಈ ಆಫರ್ ಪರಿಶೀಲಿಸಿ',
  offerAccepted: '{price} ಗೆ ಸ್ವೀಕಾರವಾಗಿದೆ. ಡೆಮೊ ಆದೇಶ ಇಡುವವರೆಗೆ ಸರಕು ಕಾಯ್ದಿರಿಸಲಾಗುವುದಿಲ್ಲ.',
  offerTooLow: 'ಈ ಆಫರ್ ಕರ್ತೃ ನಿಗದಿಪಡಿಸಿದ ಕನಿಷ್ಠ ಬೆಲೆ {minimum} ಕ್ಕಿಂತ ಕಡಿಮೆ. ಸ್ವಲ್ಪ ಹೆಚ್ಚಿಸಿ, ಅಥವಾ ಪಟ್ಟಿ ಬೆಲೆಗೆ ಖರೀದಿಸಿ.',
  offerTooHigh: 'ಇದು ಪಟ್ಟಿ ಬೆಲೆ {listed} ಕ್ಕಿಂತ ಹೆಚ್ಚು. ಪಟ್ಟಿ ಬೆಲೆಗೆ ಖರೀದಿಸಲು ಈಗ ಖರೀದಿಸಿ ಬಳಸಿ.',
  offerInvalid: 'ರೂಪಾಯಿಗಳಲ್ಲಿ ಪೂರ್ಣ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ.',
  continueCheckout: 'ಡೆಮೊ ಚೆಕ್‌ಔಟ್‌ಗೆ ಮುಂದುವರಿಸಿ',
  passportKicker: 'ಕರ್ತೃ ಘೋಷಿತ ದಾಖಲೆ',
  passportDisclaimer:
    'ಈ ಪಾಸ್‌ಪೋರ್ಟ್ ಅನ್ನು ಕರ್ತೃ ಬರೆದಿದ್ದಾರೆ. QR ಕೋಡ್ ಈ ಪುಟವನ್ನು ಮಾತ್ರ ತೆರೆಯುತ್ತದೆ. ಅದು ಅಸಲಿಯನ್ನು ಪರಿಶೀಲಿಸುವುದಿಲ್ಲ ಮತ್ತು ವಸ್ತು GI ಪ್ರಮಾಣಿತವೆಂದು ಅರ್ಥವಲ್ಲ.',
  passportId: 'ಪಾಸ್‌ಪೋರ್ಟ್ ಗುರುತು',
  makerDeclared: 'ಕರ್ತೃ ಘೋಷಿಸಿದ್ದು',
  region: 'ಪ್ರದೇಶ',
  process: 'ತಯಾರಿಕೆಯ ಟಿಪ್ಪಣಿ',
  qrTitle: 'ಪಾಸ್‌ಪೋರ್ಟ್ QR',
  qrLocalhost:
    'ಈ QR ಲೋಕಲ್‌ಹೋಸ್ಟ್ ವಿಳಾಸವನ್ನು ತೋರಿಸುತ್ತದೆ. ಬೇರೆ ಜಾಲದ ಫೋನ್ ಅದನ್ನು ತೆರೆಯಲಾರದು. ಸೈಟ್ ಅನ್ನು ನಿಯೋಜಿಸಿ, ಅಥವಾ ಈ ಕಂಪ್ಯೂಟರ್‌ನಲ್ಲೇ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ.',
  copyLink: 'ಪಾಸ್‌ಪೋರ್ಟ್ ಲಿಂಕ್ ನಕಲಿಸಿ',
  copied: 'ಲಿಂಕ್ ನಕಲಾಗಿದೆ',
  copyFailed: 'ನಕಲಿಸಲಾಗಲಿಲ್ಲ. ಲಿಂಕ್ ಆಯ್ಕೆ ಮಾಡಿ ನಕಲಿಸಿ.',
  backToProduct: 'ಉತ್ಪನ್ನಕ್ಕೆ ಹಿಂದಿರುಗಿ',
  notForSale: 'ಈ ಪಟ್ಟಿ ಈಗ ಅಂಗಡಿಯಲ್ಲಿ ಇಲ್ಲ.',
  missingTitle: 'ಈ ಕರಕುಶಲ ಶೆಲ್ಫ್‌ನಲ್ಲಿ ಇಲ್ಲ',
  missingBody: 'ಲಿಂಕ್ ಹಳೆಯದಾಗಿರಬಹುದು, ಅಥವಾ ಪಟ್ಟಿ ಈ ಬ್ರೌಸರ್‌ನಿಂದ ತೆಗೆದಿರಬಹುದು.',
  dashboardTitle: 'ನನ್ನ ಕರಕುಶಲ',
  dashboardLead: 'ಪಟ್ಟಿ ಪ್ರಕಟಿಸಿ, ಬೆಲೆ ನೋಡಿ, ಡೆಮೊ ಆದೇಶಗಳನ್ನು ಪರಿಶೀಲಿಸಿ. ಈ ಬ್ರೌಸರೇ ಕಾರ್ಯಾಗಾರ. ಖಾತೆ ಇಲ್ಲ.',
  publishedCount: '{count} ಪ್ರಕಟಿತ',
  orderCount: '{count} ಡೆಮೊ ಆದೇಶಗಳು',
  addCraft: 'ಕರಕುಶಲ ಸೇರಿಸಿ',
  edit: 'ಸಂಪಾದಿಸಿ',
  publish: 'ಪ್ರಕಟಿಸಿ',
  unpublish: 'ಪ್ರಕಟಣೆಯಿಂದ ತೆಗೆ',
  offersOn: 'ಆಫರ್ ಚಾಲನೆಯಲ್ಲಿದೆ',
  offersOff: 'ಆಫರ್ ನಿಲ್ಲಿಸಲಾಗಿದೆ',
  minimumOffer: 'ಕನಿಷ್ಠ {price}',
  changeOffers: 'ಬೆಲೆ ಮತ್ತು ಆಫರ್ ನಿಯಮ ಬದಲಿಸಿ',
  recentOrders: 'ಬಂದ ಡೆಮೊ ಆದೇಶಗಳು',
  viewAllOrders: 'ಎಲ್ಲ ಆದೇಶಗಳನ್ನು ನೋಡಿ',
  noOrders: 'ಇನ್ನೂ ಡೆಮೊ ಆದೇಶವಿಲ್ಲ. ಚೆಕ್‌ಔಟ್ ನಂತರ ಆದೇಶ ಇಲ್ಲಿ ಕಾಣಿಸುತ್ತದೆ.',
  offerOutcomes: 'ಆಫರ್ ಫಲಿತಾಂಶ',
  noOfferOutcomes: 'ಇನ್ನೂ ಆಫರ್ ಇಲ್ಲ. ಸ್ವೀಕೃತ ಮತ್ತು ತಿರಸ್ಕೃತ ಆಫರ್‌ಗಳು ಇಲ್ಲಿ ಬರುತ್ತವೆ. ಪ್ರತಿಯೊಂದನ್ನು ನೀವು ಅನುಮೋದಿಸಬೇಕಿಲ್ಲ.',
  offerAcceptedShort: 'ಸ್ವೀಕೃತ',
  offerRejectedShort: 'ತಿರಸ್ಕೃತ',
  resetDemo: 'ಡೆಮೊ ಡೇಟಾ ಮರುಹೊಂದಿಸಿ',
  resetTitle: 'ಈ ಬ್ರೌಸರ್‌ನ ಡೆಮೊ ಮರುಹೊಂದಿಸಬೇಕೇ?',
  resetBody: 'ನೀವು ಸೇರಿಸಿದ ಕರಕುಶಲ ಮತ್ತು ಎಲ್ಲ ಡೆಮೊ ಆದೇಶಗಳು ಅಳಿಯುತ್ತವೆ. ನಾಲ್ಕು ಮಾದರಿ ಪಟ್ಟಿಗಳು ಮರಳುತ್ತವೆ.',
  resetConfirm: 'ಡೆಮೊ ಡೇಟಾ ಮರುಹೊಂದಿಸಿ',
  cancel: 'ರದ್ದು',
  resetDone: 'ಮಾದರಿ ಪಟ್ಟಿಗಳು ಮರಳಿವೆ.',
  storageError: 'ಈ ಬ್ರೌಸರ್ ಡೆಮೊ ಡೇಟಾವನ್ನು ಉಳಿಸಲಾಗಲಿಲ್ಲ. ಚಿಕ್ಕ ಫೋಟೋ ಪ್ರಯತ್ನಿಸಿ, ಅಥವಾ ಡೆಮೊ ಮರುಹೊಂದಿಸಿ.',
  recoveredNote: 'ಉಳಿಸಿದ ಡೆಮೊ ಡೇಟಾ ಓದಲಾಗಲಿಲ್ಲ. ಮಾದರಿ ಪಟ್ಟಿಗಳನ್ನು ಮರಳಿಸಲಾಗಿದೆ.',
  stepDetails: 'ವಿವರ',
  stepPrice: 'ಬೆಲೆ',
  stepPreview: 'ಮುನ್ನೋಟ',
  formLead: 'ವಿವರ ಬರೆಯಿರಿ, ಬೆಲೆ ನೋಡಿ, ನಂತರ ಪ್ರಕಟಿಸಿ. ನೀವು ದೃಢಪಡಿಸುವವರೆಗೆ ಪಟ್ಟಿ ಬರುವುದಿಲ್ಲ.',
  productName: 'ಉತ್ಪನ್ನದ ಹೆಸರು',
  makerName: 'ಕರ್ತೃ ಹೆಸರು',
  category: 'ಕರಕುಶಲ ವರ್ಗ',
  chooseCategory: 'ವರ್ಗ ಆಯ್ಕೆಮಾಡಿ',
  productImage: 'ಉತ್ಪನ್ನದ ಚಿತ್ರ',
  imageHint: 'JPG, PNG ಅಥವಾ WebP. ಫೋಟೋ ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಚಿಕ್ಕದಾಗಿ ಈ ಸಾಧನದಲ್ಲೇ ಉಳಿಯುತ್ತದೆ.',
  preparingImage: 'ಫೋಟೋ ಸಿದ್ಧವಾಗುತ್ತಿದೆ…',
  description: 'ಚಿಕ್ಕ ವಿವರ',
  craftStory: 'ಕರಕುಶಲ ಕಥೆ',
  videoUrl: 'ತಯಾರಿಕೆ ವೀಡಿಯೊ ಲಿಂಕ್',
  videoHint: 'ಐಚ್ಛಿಕ. YouTube ಲಿಂಕ್ ಉತ್ಪನ್ನ ಪುಟದಲ್ಲಿ ಚಾಲನೆಯಾಗಬಹುದು. ವೀಡಿಯೊ ಇಲ್ಲದಿದ್ದರೆ ಖಾಲಿ ಬಿಡಿ.',
  voiceHint: 'ಧ್ವನಿ ಹೆಡರ್‌ನಲ್ಲಿ ಆಯ್ಕೆ ಮಾಡಿದ ಭಾಷೆಯನ್ನು ಬಳಸುತ್ತದೆ. ಪ್ರಕಟಿಸುವ ಮೊದಲು ಪಠ್ಯವನ್ನು ಸರಿಪಡಿಸಬಹುದು.',
  voiceDisclosure:
    'ಮೈಕ್ರೊಫೋನ್ ಈ ಬ್ರೌಸರ್‌ನ ವೆಬ್ ಸ್ಪೀಚ್ API ಬಳಸುತ್ತದೆ. Chrome ನಲ್ಲಿ ಆಡಿಯೋ ಬ್ರೌಸರ್ ಕಂಪನಿಯ ಸೇವೆಗೆ ಹೋಗಬಹುದು. ಕಲೆ ಕಾಯಕ ತನ್ನ ಸರ್ವರ್‌ಗೆ ಆಡಿಯೋ ಕಳುಹಿಸುವುದಿಲ್ಲ. ಟೈಪ್ ಮಾಡುವುದು ಯಾವಾಗಲೂ ಸಾಧ್ಯ.',
  speak: 'ಮಾತನಾಡಿ',
  listening: 'ಆಲಿಸುತ್ತಿದೆ…',
  stopListening: 'ಆಲಿಸುವುದನ್ನು ನಿಲ್ಲಿಸಿ',
  voiceSuccess: 'ಮಾತು ಕ್ಷೇತ್ರಕ್ಕೆ ಸೇರಿದೆ. ಪ್ರಕಟಿಸುವ ಮೊದಲು ಸರಿಪಡಿಸಿ.',
  voiceUnsupported: 'ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಧ್ವನಿ ಗುರುತಿಸುವಿಕೆ ಇಲ್ಲ. ಕ್ಷೇತ್ರದಲ್ಲಿ ಟೈಪ್ ಮಾಡಿ.',
  voiceDenied: 'ಮೈಕ್ರೊಫೋನ್ ಅನುಮತಿ ನಿರಾಕರಿಸಲಾಗಿದೆ. ಕ್ಷೇತ್ರದಲ್ಲಿ ಟೈಪ್ ಮಾಡಿ.',
  voiceNoSpeech: 'ಮಾತು ಕೇಳಿಸಲಿಲ್ಲ. ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ ಅಥವಾ ಟೈಪ್ ಮಾಡಿ.',
  voiceNoMic: 'ಮೈಕ್ರೊಫೋನ್ ಸಿಗಲಿಲ್ಲ. ಕ್ಷೇತ್ರದಲ್ಲಿ ಟೈಪ್ ಮಾಡಿ.',
  voiceNetwork: 'ಧ್ವನಿ ಸೇವೆಯನ್ನು ತಲುಪಲಾಗಲಿಲ್ಲ. ಪಠ್ಯವನ್ನು ಟೈಪ್ ಮಾಡಿ.',
  voiceUnknown: 'ಧ್ವನಿ ಗುರುತಿಸುವಿಕೆ ನಿಂತಿದೆ. ಟೈಪ್ ಮಾಡಬಹುದು.',
  hearing: 'ಕೇಳಿಸುತ್ತಿದೆ: {text}',
  numbersTyped: 'ಗಂಟೆ, ಕೂಲಿ ಮತ್ತು ವೆಚ್ಚವನ್ನು ಟೈಪ್ ಮಾಡಬೇಕು. ಮಾತು ಅವನ್ನು ತುಂಬಿಸುವುದಿಲ್ಲ.',
  labourHours: 'ದುಡಿಮೆ ಗಂಟೆಗಳು',
  hourlyRate: 'ಗಂಟೆಗೆ ಕೂಲಿ',
  wageHint: 'ದರವನ್ನು ಆಯ್ಕೆಮಾಡಿ. ನಿಮ್ಮ ಕೂಲಿ ಬೇರೆಯಿದ್ದರೆ ಸಂಖ್ಯೆಯನ್ನು ಬದಲಿಸಿ. ಪಟ್ಟಿ ಈ ಕ್ಷೇತ್ರದ ಸಂಖ್ಯೆಯನ್ನೇ ಬಳಸುತ್ತದೆ.',
  materialCost: 'ಸಾಮಗ್ರಿ ವೆಚ್ಚ',
  packagingCost: 'ಪ್ಯಾಕಿಂಗ್ ಮತ್ತು ಸಾಗಣೆ',
  premiumHint: 'ಕೌಶಲಕ್ಕೆ ಹೆಚ್ಚುವರಿ ಮೊತ್ತ. ಇದು ಕರ್ತೃಗಳ ಗಳಿಕೆಯ ಭಾಗ. ಎರಡನೇ ದುಡಿಮೆ ಶುಲ್ಕವಲ್ಲ.',
  feeHint: 'ವೇದಿಕೆ ಶುಲ್ಕ ಒಂದು ನಿಗದಿ ಮೊತ್ತ, ಒಮ್ಮೆ ಸೇರಿಸಲಾಗುತ್ತದೆ. ಸಲಹೆ ಶುಲ್ಕದ ಮೊದಲ ಮೊತ್ತದ {percent}% ({amount}).',
  useSuggestedFee: 'ಸೂಚಿತ ಶುಲ್ಕ ಬಳಸಿ',
  customFee: 'ನೀವು ನಿಮ್ಮ ಶುಲ್ಕವನ್ನು ಬಳಸುತ್ತಿದ್ದೀರಿ.',
  quantity: 'ಲಭ್ಯ ಪ್ರಮಾಣ',
  fulfilmentDays: 'ತಯಾರಿಸಲು ದಿನಗಳು',
  enableOffers: 'ಆಫರ್‌ಗಳನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಸ್ವೀಕರಿಸಿ',
  floorExplain: 'ಕನಿಷ್ಠ ಮಿತಿ ಕನಿಷ್ಠ {floor}. ಅದು ದುಡಿಮೆ, ಸಾಮಗ್ರಿ, ಪ್ಯಾಕಿಂಗ್ ಮತ್ತು ವೇದಿಕೆ ಶುಲ್ಕವನ್ನು ಒಳಗೊಂಡಿದೆ. ಆಫರ್ ಅದಕ್ಕಿಂತ ಕಡಿಮೆ ಹೋಗಲಾರದು ಮತ್ತು ಪಟ್ಟಿ ಬೆಲೆಗಿಂತ ಹೆಚ್ಚಾಗಲಾರದು.',
  minimumPrice: 'ಸ್ವೀಕಾರಾರ್ಹ ಕನಿಷ್ಠ ಆಫರ್',
  continue: 'ಮುಂದೆ',
  back: 'ಹಿಂದೆ',
  previewLead: 'ಖರೀದಿದಾರರು ನೋಡುವ ಕಾರ್ಡ್ ಇದು, ಮತ್ತು ಅವರು ಪಾವತಿಸುವ ಬೆಲೆಯೂ ಇದು.',
  previewActions: 'ಪ್ರಕಟಿಸಿದ ನಂತರ ನೋಡಿ ಮತ್ತು ಖರೀದಿಸಿ ಕ್ರಿಯೆಗಳು ಕೆಲಸ ಮಾಡುತ್ತವೆ.',
  confirmListing: 'ಈ ಪಟ್ಟಿ ಮತ್ತು ಸೂಚಿತ ಬೆಲೆ {price} ಅನ್ನು ನಾನು ದೃಢಪಡಿಸುತ್ತೇನೆ.',
  publishListing: 'ಪಟ್ಟಿ ಪ್ರಕಟಿಸಿ',
  saveListing: 'ಉಳಿಸಿ ಪ್ರಕಟಿಸಿ',
  publishedBanner: 'ಪ್ರಕಟವಾಗಿದೆ. ಈ ಪಟ್ಟಿ ಈಗ ಅನ್ವೇಷಣೆಯಲ್ಲಿದೆ.',
  updatedBanner: 'ಉಳಿಸಲಾಗಿದೆ. ಅಂಗಡಿ ಈ ಬೆಲೆ ಮತ್ತು ವಿವರಗಳನ್ನು ಬಳಸುತ್ತಿದೆ.',
  errRequired: 'ಮುಂದುವರಿಸಲು ಇದನ್ನು ಭರ್ತಿ ಮಾಡಿ.',
  errTooLong: 'ಇದು ತುಂಬಾ ಉದ್ದವಾಗಿದೆ. ಸ್ವಲ್ಪ ಕಡಿಮೆ ಮಾಡಿ.',
  errCategory: 'ಕರಕುಶಲ ವರ್ಗವನ್ನು ಆಯ್ಕೆಮಾಡಿ.',
  errImage: 'ಉತ್ಪನ್ನದ ಫೋಟೋ ಸೇರಿಸಿ.',
  errImageType: 'JPG, PNG ಅಥವಾ WebP ಫೋಟೋ ಬಳಸಿ.',
  errImageLarge: 'ಚಿಕ್ಕದಾಗಿಸಿದ ನಂತರವೂ ಫೋಟೋ ದೊಡ್ಡದಾಗಿದೆ. ಚಿಕ್ಕದನ್ನು ಪ್ರಯತ್ನಿಸಿ.',
  errImageRead: 'ಆ ಫೋಟೋ ಓದಲಾಗಲಿಲ್ಲ. ಬೇರೆ ಫೈಲ್ ಪ್ರಯತ್ನಿಸಿ.',
  errHours: 'ಗಂಟೆಗಳನ್ನು ಸಂಖ್ಯೆಯಾಗಿ ನಮೂದಿಸಿ, ಉದಾಹರಣೆಗೆ 6 ಅಥವಾ 2.5.',
  errMoney: 'ರೂಪಾಯಿಗಳಲ್ಲಿ ಪೂರ್ಣ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ, ಶೂನ್ಯ ಅಥವಾ ಹೆಚ್ಚು.',
  errTooHigh: 'ಆ ಅಂಕಿ ಈ ಡೆಮೊದ ಮಿತಿಗಿಂತ ಹೆಚ್ಚಾಗಿದೆ.',
  errPrice: 'ಬೆಲೆ ಲೆಕ್ಕವಾಗಲಿಲ್ಲ. ಅಂಕಿಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.',
  errVideo: 'ಪೂರ್ಣ http ಅಥವಾ https ಲಿಂಕ್ ನಮೂದಿಸಿ, ಅಥವಾ ಖಾಲಿ ಬಿಡಿ.',
  errQuantity: 'ಲಭ್ಯ ತುಣುಕುಗಳನ್ನು 1 ರಿಂದ 99 ರೊಳಗೆ ನಮೂದಿಸಿ.',
  errFulfilment: 'ತಯಾರಿಸಲು ಬೇಕಾದ ದಿನಗಳನ್ನು 1 ರಿಂದ 180 ರೊಳಗೆ ನಮೂದಿಸಿ.',
  errMinFloor: 'ಕನಿಷ್ಠ ಮೊತ್ತ ಕನಿಷ್ಠ {floor} ಇರಬೇಕು. ಅದು ದುಡಿಮೆ ಮತ್ತು ವೆಚ್ಚದ ನೆಲ ಜೊತೆಗೆ ವೇದಿಕೆ ಶುಲ್ಕ.',
  errMinList: 'ಕನಿಷ್ಠ ಮೊತ್ತ ಪಟ್ಟಿ ಬೆಲೆಗಿಂತ ಹೆಚ್ಚಿರಬಾರದು.',
  errConfirm: 'ಪ್ರಕಟಿಸುವ ಮೊದಲು ಪಟ್ಟಿ ಮತ್ತು ಬೆಲೆಯನ್ನು ದೃಢಪಡಿಸಿ.',
  checkoutTitle: 'ಈ ಡೆಮೊ ಆದೇಶವನ್ನು ಪರಿಶೀಲಿಸಿ',
  checkoutLead: 'ತುಣುಕು, ಬೆಲೆ ಮತ್ತು ವಿತರಣಾ ಟಿಪ್ಪಣಿ ನೋಡಿ. ನಿಜವಾದ ಪಾವತಿ ಇಲ್ಲ.',
  reviewOrder: 'ಆದೇಶ',
  agreedOffer: 'ಸ್ವೀಕೃತ ಆಫರ್, ತಲಾ {price}',
  listedInstead: 'ಬದಲಿಗೆ ಪಟ್ಟಿ ಬೆಲೆಗೆ ಖರೀದಿಸಿ',
  clearOffer: 'ಸ್ವೀಕೃತ ಆಫರ್ ತೆಗೆದುಹಾಕಿ',
  invalidOfferNotice: 'ಆ ಆಫರ್ ಈಗ ಮಾನ್ಯವಲ್ಲ. ಈ ಚೆಕ್‌ಔಟ್ ಪಟ್ಟಿ ಬೆಲೆಯನ್ನು ಬಳಸುತ್ತದೆ.',
  qtyLabel: 'ಪ್ರಮಾಣ',
  onlyLeft: 'ಇನ್ನೂ {count} ಮಾತ್ರ ಉಳಿದಿವೆ.',
  deliveryDetails: 'ವಿತರಣಾ ವಿವರ',
  buyerName: 'ನಿಮ್ಮ ಹೆಸರು',
  phone: 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ',
  address: 'ವಿಳಾಸ',
  city: 'ನಗರ ಅಥವಾ ಪಟ್ಟಣ',
  pincode: 'ಪಿನ್ ಕೋಡ್',
  placeOrder: 'ಡೆಮೊ ಆದೇಶ ಇಡಿ',
  noPayment: 'ಯಾವುದೇ ಪಾವತಿ ಆಗುವುದಿಲ್ಲ. ಇದು ಈ ಸಾಧನದಲ್ಲಿ ಡೆಮೊ ಆದೇಶವನ್ನು ಸೃಷ್ಟಿಸುತ್ತದೆ.',
  errPhone: '10 ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ.',
  errPincode: '6 ಅಂಕಿಯ ಪಿನ್ ಕೋಡ್ ನಮೂದಿಸಿ.',
  errStock: 'ಕೇವಲ {count} ಲಭ್ಯ.',
  errUnavailable: 'ಈ ತುಣುಕನ್ನು ಆದೇಶಿಸಲು ಲಭ್ಯವಿಲ್ಲ.',
  errOfferCheckout: 'ಆಫರ್ ಬಳಸಲಾಗಲಿಲ್ಲ. ಉತ್ಪನ್ನವನ್ನು ರಿಫ್ರೆಶ್ ಮಾಡಿ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
  orderPlaced: 'ಡೆಮೊ ಆದೇಶ ಇಡಲಾಗಿದೆ',
  orderReference: 'ಆದೇಶ ಉಲ್ಲೇಖ',
  viewOrder: 'ಆದೇಶಗಳಲ್ಲಿ ನೋಡಿ',
  demoOnly: 'ಇದು ಅನುಕರಣೆ ಆದೇಶ. ಏನೂ ಪಾವತಿಯಾಗಿಲ್ಲ ಮತ್ತು ಏನೂ ರವಾನೆಯಾಗುವುದಿಲ್ಲ.',
  breakdownAtPurchase: 'ಈ ಆದೇಶದೊಂದಿಗೆ ಉಳಿಸಿದ ಬೆಲೆ ವಿಭಜನೆ',
  agreedTotal: 'ಒಪ್ಪಿದ ಒಟ್ಟು',
  statusConfirmed: 'ದೃಢಪಟ್ಟಿದೆ',
  statusPreparing: 'ಸಿದ್ಧವಾಗುತ್ತಿದೆ',
  statusReady: 'ಹಸ್ತಾಂತರಕ್ಕೆ ಸಿದ್ಧ',
  advanceStatus: '{status} ಎಂದು ಗುರುತಿಸಿ',
  fromOffer: 'ಸ್ವೀಕೃತ ಆಫರ್',
  listedPurchase: 'ಪಟ್ಟಿ ಬೆಲೆ',
  ordersLead: 'ಡೆಮೊ ಆದೇಶಗಳು ಈ ಬ್ರೌಸರ್‌ನಲ್ಲೇ ಉಳಿಯುತ್ತವೆ. ಪ್ರತಿ ಆದೇಶದ ಬೆಲೆ ಚೆಕ್‌ಔಟ್‌ನಲ್ಲಿ ಒಪ್ಪಿದ ಬೆಲೆ.',
  orderMissing: 'ಆ ಆದೇಶ ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಇಲ್ಲ.',
  footerNote: 'ಕಲೆ ಕಾಯಕ DevHost 2026 ವಿದ್ಯಾರ್ಥಿ ಮಾದರಿ. ಡೆಮೊ ಆದೇಶಗಳು ಪಾವತಿ ತೆಗೆದುಕೊಳ್ಳುವುದಿಲ್ಲ. ಉತ್ಪಾದನಾ ಲಾಗಿನ್ ಇಲ್ಲ.',
  photoCredit: 'ಮಾದರಿ ಫೋಟೋಗಳು ಉಲ್ಲೇಖ ಚಿತ್ರಗಳು. ಮೂಲ README ನಲ್ಲಿದೆ.',
  notFoundTitle: 'ಈ ಪುಟ ಕಾರ್ಯಾಗಾರದ ಭಾಗವಲ್ಲ',
  notFoundBody: 'ಈಗ ಶೆಲ್ಫ್‌ನಲ್ಲಿರುವ ಕರಕುಶಲ ನೋಡಲು ಅನ್ವೇಷಿಸಿ ಬಳಸಿ.',
  loadingImage: 'ಫೋಟೋ ಸಿದ್ಧವಾಗುತ್ತಿದೆ',
  perPiece: 'ತಲಾ',
  home: 'ಕಲೆ ಕಾಯಕ ಮುಖಪುಟ',
  mainNav: 'ಮುಖ್ಯ',
}

export const messages: Record<Language, Messages> = { en, kn }

export function categoryLabel(language: Language, category: keyof Pick<Messages, 'catTextile' | 'catBasketry' | 'catCoconut' | 'catWood'>): string {
  return messages[language][category]
}
