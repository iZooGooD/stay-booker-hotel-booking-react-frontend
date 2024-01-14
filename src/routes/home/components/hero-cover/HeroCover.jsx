import SbInput from '../../../../components/SB-Input/sb-input';
const HeroCover = () => {
  return (
    <div className="bg-brand min-h-60 text-slate-100 relative">
      <div className="hero-content__container container mx-auto">
        <></>
        <div className="hero-content__text py-4">
          <h3 className="text-4xl font-medium">Search hotels in Pune</h3>
          <p className="my-1">
            Enter your dates to see the latest prices and deals for Pune hotels
          </p>
        </div>
        <div className="hero-content__search-box">
          <SbInput size="sm" placeholder="FROM" />
        </div>
      </div>
    </div>
  );
};

export default HeroCover;
