import { useProductList } from "@/domain/product/hooks/useProductList";
import Head from "@/shared/components/head"
import { styled } from "@/stitches.config";

const HomeWrapper = styled('section', {
    display: 'flex',
    justifyContent: 'center',
    height: '100vh',
    alignItems: 'center',
});

const Content = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
})

const WelcomeMessage = styled('h1', {
    fontSize: 40
});

export default function Home() {
    const { productDataList, totalData } = useProductList();
    console.log(productDataList, totalData);
    return (
        <>
            <Head>
                DDD Next App
            </Head>
            <HomeWrapper>
                <Content>
                    <WelcomeMessage>Welcome to Next Js DDD Project</WelcomeMessage>
                    <div>
                        Domain Driven Design Next JS Code Base
                    </div>
                </Content>
            </HomeWrapper>
        </>
    );
}
