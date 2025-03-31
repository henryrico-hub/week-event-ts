import {Divider, Flex, List, Skeleton, Space} from 'antd'

export type skeletonTypes = {
  loading: boolean
  avatar: any
  title: any
  paragraph: any
  children : any
  sizeContent : {
    Ipx? : string,
    Ipy? : string,
    Im? : string, 
    Imy? : string, 
    Imx? : string, 
    
    Ppt? : string,
    Ppr? : string,
    Ppb? : string,
    Ppl? : string,
    Pmt? : string,
    Pmr? : string,
    Pmb? : string,
    Pml? : string,
    zero?: string,
    height?: string, 
    width?: string,
    gutter?: number,
    c?: number,
    cc?: number,
    ccc?: number,
  }
}
const data = [
  { n: '1'},
  { n: '2'},
  { n: '3'},
  { n: '4'}
]
const data2 = [
  { n: '1'},
  { n: '2'},
  { n: '3'},
  { n: '4'},
  { n: '5'},
  { n: '6'},
  { n: '7'},
]

export function SkeletonCustom({ loading, avatar, title, paragraph, children, sizeContent }: skeletonTypes) {

  return (
    <>
      {loading && 
        <Skeleton.Image
          active
          style={{
            padding: sizeContent.Ipx,
            marginTop: sizeContent.Im,
            marginLeft: sizeContent.Im,
            marginRight: sizeContent.Im,
            height: sizeContent.height,
            width: sizeContent.width,
          }}
          >
        </Skeleton.Image>
      }
    
      <Skeleton
        loading={loading}
        active
        avatar={avatar}
        title={title}
        paragraph={paragraph}
        style={{ 
          padding: sizeContent.Ppb,
          paddingLeft: sizeContent.Ppl,
          paddingRight: sizeContent.Ppl
        }}
      >
        {children}
      </Skeleton>
      
    </>
  )
}
export function SkeletonGrid({ loading, avatar, title, paragraph, children, sizeContent }: skeletonTypes) {

  return (
    <>
      {loading && 
      
        <List 
          grid={{
            gutter: 4,
            xs: 1,
            sm: 1,
            md: 1,
            lg: 2,
            xl: 2,
            xxl: 2,
          }}
          dataSource={data}
          renderItem={() => (
            <List.Item>
              <Skeleton.Image
                active
                style={{
                  padding: sizeContent.Ipx,
                  marginTop: sizeContent.Imy,
                  marginLeft: sizeContent.Imx,
                  marginRight: sizeContent.Im,
                  height: sizeContent.height,
                  width: sizeContent.width,
                }}
              />
              <Skeleton
                loading={loading}
                active
                avatar={avatar}
                title={title}
                paragraph={paragraph}
                style={{ 
                  padding: sizeContent.Ppb,
                  paddingLeft: sizeContent.Ppl,
                  paddingRight: sizeContent.Ppl
                }}
              >
                {children}
              </Skeleton>
            </List.Item>
          )}
        />
      }   
    </>
  )
}
export function SkeletonGrid2({ loading, avatar, title, paragraph, children, sizeContent }: skeletonTypes) {

  return (
    <>
      {loading && 
        <>
        <Skeleton.Button size={'large'} block={true}
          style={{
            marginTop: sizeContent.zero,
          }}
        />
        <List 
          grid={{
            gutter: 4,
            xs: sizeContent.c,
            sm: sizeContent.c,
            md: sizeContent.c,
            lg: sizeContent.cc,
            xl: sizeContent.cc,
            xxl: sizeContent.cc,
          }}
          dataSource={data}
          renderItem={() => (
            <List.Item>
              <Skeleton.Image
                active
                style={{
                  padding: sizeContent.Ipx,
                  marginTop: sizeContent.Imy,
                  marginLeft: sizeContent.Imx,
                  marginRight: sizeContent.Im,
                  height: sizeContent.height,
                  width: sizeContent.width,
                }}
              />
              <Skeleton
                loading={loading}
                active
                avatar={avatar}
                title={title}
                paragraph={paragraph}
                style={{
                  paddingBottom: sizeContent.Ppl,
                  padding: sizeContent.Ppb,
                  paddingLeft: sizeContent.Ppl,
                  paddingRight: sizeContent.Ppb
                }}
              >
                {children}
              </Skeleton>
              <Flex gap={'middle'} 
                style={{
                  paddingLeft: sizeContent.Ppl,
                  paddingRight: sizeContent.Ppb
                  }}
              >
                <Skeleton.Avatar active size={'large'} />
                <Skeleton.Button active size={'large'} block={true}/>
              </Flex>
            </List.Item>
          )}
        />
        </>
      }    
    </>
  )
}
export function SkeletonLarge({ loading, avatar, title, paragraph, children, sizeContent }: skeletonTypes) {

  return (
    <>
      {loading && 
        <>
        <Skeleton.Button block={true} size='large'/>
        <Skeleton.Image
          active
          style={{
            padding: sizeContent.Ipx,
            margin: sizeContent.Im,
            height: sizeContent.height,
            width: sizeContent.width,
          }}
          >
        </Skeleton.Image>  
        </>
      }
      <Skeleton
        loading={loading}
        active
        avatar={avatar}
        title={title}
        paragraph={paragraph}
        style={{
          padding: sizeContent.Ipx,
          marginTop: sizeContent.zero,
          marginLeft: sizeContent.zero,
          marginRight: sizeContent.Im,
          height: sizeContent.height,
          width: sizeContent.width,
        }}
      >
        {children}
      </Skeleton>
    </>
  )
}
export function SkeletonBreaking({ loading, avatar, title, paragraph, children, sizeContent }: skeletonTypes) {

  return (
    <>
      
      <Skeleton
        loading={loading}
        active
        avatar={avatar}
        title={title}
        paragraph={paragraph}
        style={{
          padding: sizeContent.Ppt,
          marginTop: sizeContent.Ppt,
          marginLeft: sizeContent.Ppl,
          marginRight: 'auto',
          marginBottom: sizeContent.Ppb,
          width: sizeContent.width,
        }}
      >
        {children}
      </Skeleton>
    </>
  )
}
export function SkeletonGridSocial({ loading, avatar, title, paragraph, children, sizeContent }: skeletonTypes) {

  return (
    <>
      {loading && 
        <>
        <List 
          grid={{
            gutter: 4,
            xs: 1,
            sm: 1,
            md: 1,
            lg: 1,
            xl: 1,
            xxl: 1,
          }}
          style={{ marginBottom: '1rem' }}
          dataSource={data2}
          renderItem={() => (
            <List.Item>
              <Flex align="start" justify="center">
                <Skeleton.Image
                  active
                  style={{
                    padding: sizeContent.Ipx,
                    marginTop: sizeContent.Imy,
                    marginLeft: sizeContent.Imx,
                    marginRight: sizeContent.Im,
                    height: sizeContent.height,
                    width: sizeContent.width,
                  }}
                />
                <Skeleton
                  loading={loading}
                  active
                  avatar={avatar}
                  title={title}
                  paragraph={paragraph}
                  style={{
                    paddingBottom: sizeContent.Ppl,
                    padding: sizeContent.Ppb,
                    paddingLeft: sizeContent.Ppl,
                    paddingRight: sizeContent.Ppb
                  }}
                >
                  {children}
                </Skeleton>
              </Flex>
            </List.Item>
          )}
        />
        </>
      }    
    </>
  )
}